(function ($) {
  Drupal.behaviors.campaignName = {
    attach: function (context, settings) {
      Drupal.settings.login = {
        replaceText      : 'You are almost there',
        afterReplaceText : 'Just register with DoSomething.org to join I Heart Dad',
      };

      $('#cmp #edit-actions').removeAttr('id');

          // campaign logo injection
    var logo = '//www.dosomething.org/files/campaigns/dad13/logo2.png';
    $('.region-sidebar-first').not('.logo-processed').addClass('logo-processed').css('margin-left','-20px').prepend('<a href="/iheartdad"><img src="' + logo + '"/></a>');
    

      // hacktastic form rebuilding
      var $emailInput = $('#edit-submitted-field-webform-email');
      var $cellInput = $('#edit-submitted-field-webform-mobile');

      $cellInput.before($emailInput); // re-arranges input field order
      $('#submitted-field-webform-email-add-more-wrapper').not('.ds-processed').addClass('.ds-processed').prepend($('#contact-form-email-label'));
      $('#submitted-field-webform-mobile-add-more-wrapper').not('.ds-processed').addClass('.ds-processed').prepend($('#contact-form-cell-label'));


      // contact form login
      $('.pane-campaign-sign-up .form-actions').append('<p>Already signed up? <a href="/user?destination=node/729551" class="sign-in-popup">log in</a></p>');

      // on lines 9-10 terrible things happen
      $('#campaign-opt-in br').remove();
      $('.ctia_top').not('.classy').addClass('classy').append('&nbsp;');

      // Hol' a medz in da paddie, man
      var contactForm = $('.pane-campaign-sign-up');
      $('#signup #contact-form').not('oneLove').addClass('oneLove').append(contactForm);

      // change over contact form
      var changeForm = $('.pane-campaign-signed');
      $('#signup #contact-form').not('oneLove').addClass('oneLove').append(changeForm);


     
      // FAQ - onClick
      $('#faq h4').next('div').css('display','none');
      $('#faq h4.activeFAQ').next('div').css('display','block');
      $('#faq h4').click(function(){
        if($(this).hasClass('activeFAQ')){
          $(this).removeClass().next('div').slideUp();
        }
        else{
          $(this).addClass('activeFAQ');
          $(this).siblings('h4').removeClass('activeFAQ');
          $(this).next('div').slideToggle();
          $(this).siblings().next('div').slideUp();      
        }
      });

      // anchor for Tips
      $("a[href=#tips]").click(function() {
        $("#tips").addClass("activeFAQ");
        $("#tips").next("div").slideToggle();
        $("#tips").siblings().next('div').slideUp();
      });

      // animation for a.jump_scroll
      var contentAnchors = 'a.jump_scroll';
      var navAnchors = '#block-dosomething-campaign-styles-campaign-nav a';
      var allAnchors = navAnchors + ', ' + contentAnchors;

      // variables for input highlighting
      var webformEmail = '#contact-form input[type="text"]';
      var webformCell = '#contact-form input[type="tel"]';
      var webformBoth = webformEmail + ', ' + webformCell;

      // scrolling navigation block
      $(window).bind('load', function() {
        var $nav = $('#block-dosomething-campaign-styles-campaign-nav');
        var $footer = $('#block-menu-menu-footer');
        var $document = $(document);
        var scrollLimitTop = $nav.offset().top;
        $document.scroll(function () {
          var st = $document.scrollTop();
          var scrollLimitBot = $document.height() - $nav.outerHeight() - $footer.outerHeight();
          if (st > scrollLimitTop && st < scrollLimitBot) { // once scrolling engages $nav
            $nav.css({
              'position'    : 'fixed',
              'top'         : '0px',
              'bottom'      : 'auto',
              'z-index'     : '3'
            });
          }
          else if (st >= scrollLimitTop) { // once $nav hits $footer
            scrollLimitTop = $nav.offset().top;
            $nav
              .css('position', 'absolute')
              .css('top', 'auto')
              .css('bottom', '25px')
          }
          else { // before scrolling engages $nav
            scrollLimitTop = $nav.offset().top;
            $nav
              .css('position', 'static')
          }
        });
      }); // end scrolling nav


      $(document).ready(function(){
        $(webformEmail).focus().addClass('focusOutline');
      });
      $(webformBoth).focus(function(){
        $(this).addClass('focusOutline');
      });
      $(webformBoth).blur(function() {
        $(this).removeClass('focusOutline');
      });

      $(allAnchors).click(function(event){
        $('html,body').animate({scrollTop: $(event.target.hash).offset().top}, 'slow');  
        if($(this).attr('href') == '#header'){
          $(webformEmail).focus().addClass('focusOutline');
        }
        return false;
      });

      // nav highlighting 
      var plainNav = '#block-dosomething-campaign-styles-campaign-nav li';
      var firstNav = plainNav + ' a' + '.first';

      $(firstNav).css('background','#FFCB15');
      $(plainNav + ' a').click(function(){
          $(this).css('background','#FFCB15').parent().find('a').css('background','#fff');
      });

      $(allAnchors).click(function(event){
        $('html,body').animate({scrollTop: $(event.target.hash).offset().top}, 'slow');  
        return false;
      });

    // #header section Facebook fun
    var fb_share_img = 'http://www.dosomething.org/files/campaigns/dad13/iheartdad-preview.jpg';
    var fb_title = 'I Heart Dad';
    var fb_header_caption = '';

    Drupal.behaviors.fb.feed({
      'feed_picture': fb_share_img,
      'feed_title': fb_title,
      'feed_caption': fb_header_caption,
      'feed_description': 'Did you know 1 in 3 adults in the U.S. have high blood pressure? This Father\'s Day season, @DoSomething is encouraging teens to give their dads the most important present - the gift of a healthy heart! Join I Heart Dad to have his blood pressure checked: www.dosomething.org/iheartdad',
      'feed_selector': '.header-facebook-share',
    }, function(response){
      window.location.href = '/iheartdad#header';
    });

         
    } // end attach: function
  }; // end Drupal.behaviors
})(jQuery); // end function ($)
