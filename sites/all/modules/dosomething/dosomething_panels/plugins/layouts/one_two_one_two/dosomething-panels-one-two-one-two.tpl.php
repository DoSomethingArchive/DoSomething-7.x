<div class="panel-one-two-one-two panel-display ds-panel" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <?php if ($content['top']): ?>
    <div class="panel-top panel-full panel-panel">
      <?php print $content['top']; ?>
    </div>
  <?php endif; ?>

  <?php if ($content['row2-left'] || $content['row2-right']): ?>
    <div class="panel-row panel-row-2cols panel-row2 <?php print $row2_row_classes; ?>">
      <?php if ($content['row2-left']): ?>
        <div class="panel-first panel-panel">
           <?php print $content['row2-left']; ?>
        </div>
      <?php endif; ?>
      <?php if ($content['row2-right']): ?>
        <div class="panel-second panel-last panel-panel">
           <?php print $content['row2-right']; ?>
        </div>
      <?php endif; ?>
    </div>
  <?php endif; ?>

  <?php if ($content['row3']): ?>
    <div class="panel-row3 panel-full panel-panel">
      <?php print $content['row3']; ?>
    </div>
  <?php endif; ?>

  <?php if ($content['bottom-left'] || $content['bottom-right']): ?>
    <div class="panel-row panel-row-2cols panel-row-bottom <?php print $bottom_row_classes; ?>">
      <?php if ($content['bottom-left']): ?>
        <div class="panel-first panel-panel">
           <?php print $content['bottom-left']; ?>
        </div>
      <?php endif; ?>
      <?php if ($content['bottom-right']): ?>
        <div class="panel-second panel-last panel-panel">
           <?php print $content['bottom-right']; ?>
        </div>
      <?php endif; ?>
    </div>
  <?php endif; ?>
</div>
