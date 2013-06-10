<?php

/**
 * @file
 * Used for admin pages in dosomething_subscribe functionality. 
 **/

/**
 * Returns a form used to set dosomething_subscribe_mailchimp variables.
 */
function dosomething_subscribe_mailchimp_admin_settings_form() {
  $form = array();
  $key_state = variable_get('dosomething_subscribe_mailchimp_is_api_key_valid');
  // Alter Mailchimp Key description based on current API key state variable:
  if (!$key_state) {
    $description = "Invalid API key reported on " . format_date(variable_get('dosomething_subscribe_mailchimp_api_key_invalid_time')) . ".  Please enable the key in Mailchimp and validate, or enter a new valid API key.";
  }
  else {
    $description = 'API key last validated on ' . format_date(variable_get('dosomething_subscribe_mailchimp_api_key_last_validated')) . '.';

  }
  $form['mailchimp_api_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Mailchimp API Key'),
    '#required' => TRUE,
    '#default_value' => variable_get('mailchimp_api_key'),
    '#description' => $description,
  );
  $form['mailchimp_use_secure'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use Secure Connection'),
    '#default_value' => variable_get('mailchimp_use_secure', TRUE),
    '#description' => t('Communicate with the MailChimp API over a secure connection.')
  ); 
  $form['dosomething_subscribe_mailchimp_notify_email'] = array(
    '#type' => 'textfield',
    '#title' => t('Notification Email'),
    '#required' => TRUE,
    '#default_value' => variable_get('dosomething_subscribe_mailchimp_notify_email', 'developers@dosomething.org'),
    '#description' => t('Used to notify in case of an invalid API key error.')
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Submit and Validate',
  );
  return $form;
}

/**
 * Submit handler saves variables, and checks that the API key is valid against the Mailchimp service.
 */
function dosomething_subscribe_mailchimp_admin_settings_form_submit($form, &$form_state) {
  // Set variables:
  variable_set('mailchimp_api_key', $form_state['values']['mailchimp_api_key']);
  variable_set('mailchimp_use_secure', $form_state['values']['mailchimp_use_secure']);
  variable_set('dosomething_subscribe_mailchimp_notify_email', $form_state['values']['dosomething_subscribe_mailchimp_notify_email']);
  // Check connection to Mailchimp API with inputted API key.
  $mcapi = dosomething_subscribe_mailchimp_get_api_object();
  // Run a simple request in order to see if we get any errors.
  $response = $mcapi->getVerifiedDomains();
  if ($mcapi->errorCode) {
    if ($mcapi->errorCode == DOSOMETHING_SUBSCRIBE_MAILCHIMP_INVALID_API_KEY_ERROR_CODE) {
      dosomething_subscribe_mailchimp_invalid_api_notify();
    }
    drupal_set_message('Mailchimp API - Error Code ' . $mcapi->errorCode . ': ' . $mcapi->errorMessage, 'error');
  }
  else {
    // If API key was previously invalid, make it all better.
    variable_set('dosomething_subscribe_mailchimp_is_api_key_valid', TRUE);
    variable_set('dosomething_subscribe_mailchimp_api_key_last_validated', time());
    // Notify that service has been restored.
    drupal_mail('dosomething_subscribe_mailchimp', 'restored_api_key', variable_get('dosomething_subscribe_mailchimp_notify_email', 'developers@dosomething.org'), $language);
    // Log the good news.
    watchdog('dosomething_subscribe_mailchimp', 'API key is now valid for @key.', array('@key' => variable_get('mailchimp_api_key')));
  }
}