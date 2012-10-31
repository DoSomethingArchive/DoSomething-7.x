(function ($) {
  Drupal.behaviors.campaignName = {
    attach: function (context, settings) {
      Drupal.settings.login = {
        replaceText      : 'Step 2 of 3',
        afterReplaceText : 'Register with us to join Give a Spit and get all the help you need for your drive. ',
      };

      if (window.location.pathname.substr(0, 5) == '/team') {
        $signIn = $('#dosomething-login-login-popup-form');
        $signUp = $('#dosomething-login-register-popup-form');
        
        // if a popup has been triggered, set its destination
        if ($signIn.is(':visible') || $signUp.is(':visible')) {
          var actionLink = $('.drive-action-link a').attr('href');
          if (actionLink.charAt(0) == '/') actionLink = actionLink.substr(1);
          $signIn.attr('action', destinationReplace($signIn.attr('action'), actionLink));
          $signUp.attr('action', destinationReplace($signUp.attr('action'), actionLink));
        }
      }

      function destinationReplace(url, destination) {
        url = url.split('?');
        query = url[1].split('&');
        for (var i in query) {
          var splitter = query[i].split('=');
          if (splitter[0] == 'destination') {
            splitter[1] = destination;
            query[i] = splitter.join('=');
          }
        }
        return url[0] + '?' + query;
      }

      $('.tw-share-drive').attr('data-text', 'It\'s time to #GiveASpit about cancer. A simple cheek swab is all it takes to save a life. Seriously. http://dosomething.org/spit');
      $('.fb-share-drive').click(function (e) {
        e.preventDefault();
        var fbObj = {
          method: 'feed',
          link: window.location.href,
          picture: 'http://files.dosomething.org/files/styles/thumbnail/public/fb_thumbs_0.jpg',
          name: 'Give A Spit',
          description: 'Are you ready to save a life? It\'s easier than you think. Click here to get your cheek swabbed and you could end up saving a life.'
        };
        FB.ui(fbObj);
      });

      // edit drive info location change
      // $('#webform-client-form-724772 .form-item-submitted-field-drive-location-und-0-name-line label').empty().text('Name of Location');

      // drupal, eat your heart out
      var maxwell = "can have his cake and eat it too"

      if(maxwell == "can have his cake and eat it too"){
        $('#cmp #edit-actions').removeAttr('id');
      };

      // has logo, will inject
      var logo = '#';
      $('.region-sidebar-first').not('.logo-processed').addClass('logo-processed').prepend('<a href="/spit"><img src="' + logo + '"/></a>');

      // hacktastic form rebuilding
      var $emailInput = $('#edit-submitted-field-webform-email');
      var $cellInput = $('#edit-submitted-field-webform-mobile');

      $cellInput.before($emailInput); // re-arranges input field order
      $('#submitted-field-webform-email-add-more-wrapper').not('.ds-processed').addClass('ds-processed').prepend($('#contact-form-email-label'));
      $('#submitted-field-webform-mobile-add-more-wrapper').not('.ds-processed').addClass('ds-processed').prepend($('#contact-form-cell-label'));

      // removes search from nav on drive page
      if(document.location.pathname.slice(1,5) == "team") {
        $('li.campaign_nav_2').hide();
      }

      // Hol' a medz in da paddie, man
      var contactForm = $('.pane-campaign-sign-up');
      $('#header #contact-form').not('oneLove').addClass('oneLove').append(contactForm);

      // on lines 9-10 terrible things happen
      $('#campaign-opt-in br').remove();
      $('.ctia_top').not('.classy').addClass('classy').append('&nbsp;');

      // pop, bang, lovely
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

      // jQuery scrolling effect with focus!
      var contentAnchors = 'a.jump_scroll';
      var navAnchors = '#block-dosomething-campaign-styles-campaign-nav a';
      var allAnchors = navAnchors + ', ' + contentAnchors;
      
      // input highlighting
      var webformEmail = '#contact-form input[type="text"]';
      var webformCell = '#contact-form input[type="tel"]';
      var webformBoth = webformEmail + ', ' + webformCell;

      $(allAnchors).click(function(event){
        $('html,body').animate({scrollTop: $(event.target.hash).offset().top}, 'slow');  

        if($(this).attr('href') == '/spit#header'){
          $(webformEmail).focus().addClass('focusOutline');
        }
        $(webformBoth).focus(function(){
          $(this).addClass('focusOutline');
        });
        $(webformBoth).blur(function() {
          $(this).removeClass('focusOutline');
        });
        return false;
      });

      // twitter popup button on drive pages
      $('a.drive-twitter').click(function(event) {
        var width  = 650,
        height = 450,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
        ',width='  + width  +
        ',height=' + height +
        ',top='    + top    +
        ',left='   + left;

        window.open(url, 'twitter', opts);

        return false;
      });

      // remove #edit-submit from drive page buttons
      $('#drive .drive-participants-list .form-submit').val('x').removeAttr('id').addClass('remove_participant');

      // nav highlighting 
      var plainNav = '#block-dosomething-campaign-styles-campaign-nav li';
      var firstNav = plainNav + ' a' + '.first';

      $(firstNav).css('background','#FFCB15');
      $(plainNav + ' a').click(function(){
          $(this).css('background','#FFCB15').parent().find('a').css('background','#fff');
      });

      // sad puppy
      $('#mangoDialog').dialog({autoOpen: false, dialogClass: "mangoDialog-ui", width: 500, resizable: false});
      $('a.mango').click(function(){
        $('#mangoDialog').dialog('open');
        return false;
      });

      // sad Chris
      $('#chrisDialog').dialog({autoOpen: false, dialogClass: "mangoDialog-ui", width: 500, resizable: false});
      $('a.mangoChris').click(function(){
        $('#chrisDialog').dialog('open');
        return false;
      });
      
      // scroll function
      var $window = $(window);
      var $nav = $('#block-dosomething-campaign-styles-campaign-nav');
      var scrollLimitTop = 500;
      var scrollLimitBot = 6200;
      $window.scroll(function () {
        var st = $window.scrollTop();
        if (st > scrollLimitTop && st < scrollLimitBot) {
          $nav.css({
            'position'    : 'fixed',
            'top'         : '0px',
            'margin'      : '15px 0 0 -20px',
            'z-index'     : '3'
          });
        }
        else if (st >= scrollLimitTop) {
          $nav
            .css('position', 'static')
        }
        else {
          $nav
            .css('position', 'static')
        }
      });

      // kill old asterisks from required fields
      $('#dosomething-login-register-popup-form .popup-content .field-suffix').remove();

      // search pane tweak
      $('.form-item-field-geofield-distance-unit').hide();
      $('.geofield-proximity-origin-from').text('Zip code:');

      // hide/show fieldset on drive form for checkbox
      /*$("#webform-component-check-show-hide").css('display','none');

      $("#edit-submitted-give-a-spit-action-kit-1").click(function() {
        if($("#edit-submitted-give-a-spit-action-kit-1").is(":checked")) {
          $("#webform-component-check-show-hide").show("fast");
        }
        else {
          $("#webform-component-check-show-hide").hide("fast");
        }
      });*/

    // hackity hack, don't look back
    if (window.location.pathname.substring(6, 10) == 'next') {
      $('#block-dosomething-campaign-styles-campaign-nav').hide();
    }

      if ($('body').hasClass('not-logged-in')) {
        $('#super-secret-bindable-id').click(function (e) {
          e.preventDefault();
          $('#dosomething-login-register-popup-form').attr('action', '/user/registration?destination=spit/sign-up');
          $('#dosomething-login-login-popup-form').attr('action', '/user?destination=spit/sign-up');
          $('#dosomething-login-register-popup-form').dialog({
            resizable: false,
            draggable: false,
            modal: true,
            width: 550
          });
        });
      }
    
      // invite module re-ordering
      $('.invite-module-email').after($('#teams-notification-area'));

      // le sigh
      $('#dosomething-login-register-popup-form').prepend($('#dosomething-login-register-popup-form .already-member'));

    } // end attach: function
  }; // end Drupal.behaviors
})(jQuery); // end function ($)
