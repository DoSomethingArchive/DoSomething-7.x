<?php

/**
 * Argument handler for taxonomy terms with depth.
 *
 * This handler is actually part of the node table and has some restrictions,
 * because it uses a subquery
 */
class dosomething_causes_views_handler_argument_term_node_tid extends views_handler_argument_term_node_tid_depth {

  function construct() {
    parent::construct();
    // This will have to change to be set by options if the methods are ever expanded
    $this->group_field = 'nid';
  }

  function option_definition() {
    $options = parent::option_definition();
    $options['no_filter'] = array('default' => FALSE, 'bool' => TRUE);
    return $options;
  }
  
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['break_phrase'] = array(
      '#type' => 'checkbox',
      '#title' => t('Allow multiple values'),
      '#description' => t('If selected, users can enter multiple values in the form of 1+2+3, 1,2,3 or 1, 2, 3. Due to the number of JOINs it would require, AND will be treated as OR with this filter.'),
      '#default_value' => !empty($this->options['break_phrase']),
    );
    $form['no_filter'] = array(
      '#type' => 'checkbox',
      '#title' => t('Do not filter (sort only)'),
      '#description' => t('If selected, this argument will only impact the order of results (direct matches, then parents, children, siblings, then non-matches).'),
      '#default_value' => !empty($this->options['no_filter']),
    );
    unset($form['depth']);
  }

  function query($group_by = FALSE) {
    $group_by = TRUE;
    $this->ensure_my_table();
    if (!empty($this->options['break_phrase'])) {
      $handler = new stdClass();
      $handler->value = $this->argument;
      $handler = dosomething_causes_views_break_phrase_string($this->argument, $handler);
      if ($handler->value == -1) {
        return FALSE;
      }
      $term_names = array();
      $tids = array();
      foreach ($handler->value as $term) {
        $term = trim($term);
        if (is_numeric($term)) {
          $tids[] = $term;
        }
        else {
          $term_names[] = trim($term);
        }
      }
      if (count($term_names)) {
        $query = new EntityFieldQuery();
        $result = $query
          ->entityCondition('entity_type', 'taxonomy_term')
          ->propertyCondition('name', $term_names, 'IN')
          ->execute();
        if (isset($result['taxonomy_term'])) {
          $tids += array_keys($result['taxonomy_term']);
        }
      }
    }
    else {
      $tids = $this->argument;
    }

    // Favor direct tid matches in the sort.
    $direct_tids = implode(', ', $tids);
    $term_ordering = "8*IF($this->table_alias.$this->real_field IN ($direct_tids), 1, 0)";

    // Get parent tids
    $parent_tids = db_select('taxonomy_term_hierarchy', 'th')
      ->fields('th', array('parent'))
      ->condition('tid', $tids, 'IN')
      ->condition('parent', 0, '>')
      ->execute()
      ->fetchCol();
 
    // Get child tids
    $child_tids = db_select('taxonomy_term_hierarchy', 'th_children')
      ->fields('th_children', array('tid'))
      ->condition('parent', $tids, 'IN')
      ->execute()
      ->fetchCol();

    // Get sibling tids
    $query = db_select('taxonomy_term_hierarchy', 'th_siblings')
      ->fields('th_parent', array('tid'));
    $query->join('taxonomy_term_hierarchy', 'th_parent', 'th_parent.parent=th_siblings.parent AND th_siblings.tid <> th_parent.tid');
    $sibling_tids = $query->condition('th_siblings.tid', $tids, 'IN')
      ->condition('th_siblings.parent', 0, '>')
      ->execute()
      ->fetchCol();
    
    // Add parent tids and favor them in the sort.
    if ($parent_tids) {
       $tids = array_merge($tids, $parent_tids);
       $parent_tids = implode(', ', $parent_tids);
       if (!empty($term_ordering)) {
         $term_ordering .= ' + ';
       }
       $term_ordering .= "4*IF($this->table_alias.$this->real_field IN ($parent_tids), 1, 0)";
     }

     // Add child tids and favor them in the sort.
     if ($child_tids) {
       $tids = array_merge($tids, $child_tids);
       $child_tids = implode(', ', $child_tids);
       if (!empty($term_ordering)) {
         $term_ordering .= ' + ';
       }
       $term_ordering .= "2*IF($this->table_alias.$this->real_field IN ($child_tids), 1, 0)";
     }

    // Add sibling tids.
    if ($sibling_tids) {
      $tids = array_merge($tids, $sibling_tids);
      if (!empty($this->options['no_filter'])) {
        $sibling_tids = implode(', ', $sibling_tids);
        if (!empty($term_ordering)) {
          $term_ordering .= ' + ';
        }
        $term_ordering .= "IF($this->table_alias.$this->real_field IN ($sibling_tids), 1, 0)";
      }
    }

    if (!empty($term_ordering)) {
      $term_ordering = "MAX($term_ordering)";
      // A having expression seems to be necessary to get views to use the group_by.
      $this->query->add_having_expression(0, "nid > 0");

      $this->field_alias = $this->query->add_field(NULL, $term_ordering, 'term_ordering');
      $this->query->add_orderby(NULL, NULL, 'DESC', 'term_ordering');      
    }

    if (empty($this->options['no_filter'])) {
      // Query for all relevant tids
      $this->query->add_where(0, "$this->table_alias.$this->real_field", $tids, 'IN');
    }
  }  
}

