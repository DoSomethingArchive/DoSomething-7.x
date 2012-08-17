<?php

date_default_timezone_set('UTC');
$fnid = 723985;

  $time = mktime(date('H'), date('i'), 0);
  $q = new EntityFieldQuery;
  $result = $q
    ->entityCondition('entity_type', 'webform_submission_entity')
    ->propertyCondition('nid', $fnid)
    ->propertyCondition('uid', 0, '>')
    ->propertyOrderBy('submitted', 'DESC')
    ->fieldCondition('field_celeb_date', 'value', date('Y-m-d H:i:00', $time), '=')
    ->fieldCondition('field_celeb_send_now', 'value', 0, '=')
    ->execute();
  if (!empty($result))
  {
  	foreach ($result['webform_submission_entity'] AS $key => $r)
  	{
	    $s = array_shift(entity_load('webform_submission_entity', array((int) $key)));
      if ($s->field_celeb_date[LANGUAGE_NONE][0]['timezone']) {

        $usertz = new DateTimeZone($s->field_celeb_date[LANGUAGE_NONE][0]['timezone']);
        $t = new DateTime($s->field_celeb_date[LANGUAGE_NONE][0]['value'], $usertz);

        $offset = $t->getOffset();
        $now = array_sum(array($time, $offset));
        $thetime = array_sum(array(strtotime($s->field_celeb_date[LANGUAGE_NONE][0]['value']), $offset));

        $cell = $s->field_celeb_friend_phone[LANGUAGE_NONE][0]['value'];
  	    if ($now == $thetime)
  	    {
  	    	#mail('mchittenden@dosomething.org', 'Sending from Cron Job!', "Here's a message about how this worked.  Good stuff!", 'from:noreply@dosomething.org');
          robocalls_mcommons_call($cell, '', 18301);
  	    }

       echo (date('Y-m-d H:i:00', $now)) . ' ' . date('Y-m-d H:i:00', $thetime) . " (@" . $cell . ' ... ' . $s->field_celeb_date[LANGUAGE_NONE][0]['value'] . " | " . $t->getOffset() . ")\r\n";
      }
  	}
  }

#mail('mchittenden@dosomething.org', 'Ignore this email!', "Here's a message about how this worked.  Good stuff!");

?>