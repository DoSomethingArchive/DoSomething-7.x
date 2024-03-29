<?php
$plugin = array(
  // Campaign title. Not used yet, but please set it.
  'title' => '50 Cans',

  // Parent campaign to inherit the styling from
  //'parent' => 'footlocker_2011',

  // Add css files in the order they should be included.
  'css' => array(
    //'style.css',
  ),

  // Add javascript files in the order you would like to have them included.
  'js' => array(
    //'custom.js',
  ),

  // An array of arrays where the first element is the providing module
  // and the second is the library to include.  These will be passed as
  // the first two parameters to drupal_add_library().  The third parameter
  // is always FALSE because these styles are campaign specific and not site
  // wide.
  //'libraries' => array(
  //  array('system', 'ui.draggable'),
  //),

  // An array of arrays indexed with 'title' and 'href'
  // These get passed to url().
  'menu' => array(
    array('title' => 'what\'s the impact?', 'href' => '50cans', 'fragment' => 'content-infographic'),
    array('title' => 'gallery', 'href' => '50cans', 'fragment' => 'impact'),
    array('title' => 'questions', 'href' => '50cans', 'fragment' => 'faq'),
  ),
  'menu_suffix' => array(
    '#markup' => '<img src="//files.dosomething.org/files/campaigns/alcoa/alcoa-foundation2.png"/><p>Got questions? Email Alyssa at <a href="mailto:50cans@dosomething.org">50cans@dosomething.org</a>!</p>'
  ),
    'menu_prefix' => array(
    '#markup' => '<p>Go To:</p>'
  ),
);
