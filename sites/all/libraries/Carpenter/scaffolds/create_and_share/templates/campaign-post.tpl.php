<div class="crazy-submission s-<?php echo $row->sid; ?> a-<?php echo $row->users_webform_submissions_uid; ?>">
<div class="fb-and-pic">
<?php if (user_access('flag campaign submissions')): ?><div class="flag"><a href="/cas/<?php echo $campaign; ?>/flag/<?php echo $row->sid; ?>" data-sid="<?php echo $row->sid; ?>"><span><?php echo t('Flag'); ?></span></a></div><?php endif; ?>
<div class="fb-picture"></div>
<div class="s-<?php echo $row->sid; ?>-picture simg"><?php echo theme('image_style', array('style_name' => 'crazy_image_dimensions', 'path' => $row->field_field_cas_image[0]['rendered']['#item']['uri'], 'width' => 480, 'height' => 480)); ?></div>
</div>
<!-- buttons -->
<div class="buttons">
<div class="vouch-button">
<a href="#" class="button-submit<?php if (!$settings['allow_notifications']): ?> no-alert<?php endif; ?>" rel="<?php echo $row->sid; ?>"><?php echo $row->field_field_cas_thumbs_up_text[0]['rendered']['#markup']; ?></a>
<span><?php echo $row->field_field_cas_thumbs_up_count[0]['rendered']['#markup']; ?></span>
</div>
<div class="bs-button">
<a href="#" class="button-submit<?php if (!$settings['allow_notifications']): ?> no-alert<?php endif; ?>" rel="<?php echo $row->sid; ?>"><?php echo $row->field_field_cas_thumbs_down_text[0]['rendered']['#markup']; ?></a>
<span><?php echo $row->field_field_cas_thumbs_down_count[0]['rendered']['#markup']; ?></span>
</div>
<div class="fb-share">
<a href="#" rel="<?php echo $row->sid; ?>"><?php echo t('Share on Facebook'); ?></a>
</div>
</div> <!-- end buttons -->
<p class="author"><?php echo $row->field_field_user_first_name[0]['rendered']['#markup']; ?></p>
<div class="dateline"><?php echo $row->webform_submissions_submitted; ?></div>
</div>