<?php

/**
 * Checks whether we have the user's school_id. If we do, then it skips this
 * step. Otherwise, prompts user to enter state and school name and waits
 * for the response.
 */
class ConductorActivityTeamsCheckUser extends ConductorActivitySMSPrompt {

  public function run($workflow) {
    $state = $this->getState();

    $mobile = $state->getContext('sms_number');

    // If we have a user with this mobile, lets update their info.
    $account = dosomething_general_find_user_by_cell($mobile);
    $profile = NULL;

    // If we haven't found an account, let's create one.
    if (!$account) {
      $account = new stdClass;
      $account->name = $mobile;

      $suffix = 0;
      $base_name = $account->name;
      while (user_load_by_name($account->name)) {
        $suffix++;
        $account->name = $base_name . '-' . $suffix;
      }
      $account->mail = $mobile . '@mobile';
      $account->status = 1;
      user_save($account);

      $profile_values = array(
        'type' => 'main',
        'field_user_mobile' =>  array(
          LANGUAGE_NONE => array(
            array(
              'value' => $mobile,
            ),
          ),
        ),
      );
      $profile = profile2_create($profile_values);
      $profile->uid = $account->uid;
      profile2_save($profile);
    }
    else {
      $profile = profile2_load_by_user($account);
    }

    if (!empty($profile->field_user_first_name[LANGUAGE_NONE][0]['value'])) {
      print_r('got here');exit;
      $state->setContext('has_name', TRUE);
    }

    $state->markCompeted();
  }
}
