<?php

class ConductorActivityTeamsJoinTeam extends ConductorActivity {

  const SIGNUP_NID = 719306;

  public function run($workflow) {
    $state = $this->getState();

    $mobile = $state->getContext('sms_number');

    // check if the team leader info is an actual account
    if (!dosomething_general_load_user_by_mail_or_cell($state->getContext('team_leader:message'))) {
      $state->setContext('sms_response', t('Oops, that person doesn\'t exist in our system. Text JOINTEAM or STARTTEAM to try again.'));
    }
    else {
      global $user;
      $original_user = $user;
      $old_state = drupal_save_session(FALSE);
      $user = dosomething_general_find_user_by_cell($mobile);
      $profile = profile2_load_by_user($user);

      $form_state = array(
        'submitted' => true,
        'bundle' => 'campaign_sign_up',
        'values' => array(
          'submission' => NULL,
          'submitted' => array(),
          'details' => array(
            'nid' => self::SIGNUP_NID,
            'sid' => NULL,
          ),
          'form_id' => 'webform_client_form_'.self::SIGNUP_NID,
        ),
      );
      $form_state['webform_entity']['submission']->submitted['field_webform_mobile'][LANGUAGE_NONE][0]['value'] = $mobile;
      $form_state['webform_entity']['submission']->submitted['field_leader_info'][LANGUAGE_NONE][0]['value'] = $state->getContext('team_leader:message');
      $form_state['webform_entity']['submission']->bundle = $form_state['webform_entity']['bundle'] = 'campaign_sign_up';

      drupal_form_submit('webform_client_form_' . self::SIGNUP_NID, $form_state, node_load(self::SIGNUP_NID), $submission);

      $state->setContext('sms_response', t('Thanks! You\'re added to their team.'));

      $user = $original_user;
      drupal_save_session($old_state);
    }

    $state->markCompeted();
  }
}
