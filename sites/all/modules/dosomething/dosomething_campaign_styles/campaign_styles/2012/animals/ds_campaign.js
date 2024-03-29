(function ($) {
  Drupal.behaviors.campaignName = {
    attach: function (context, settings) {

   var contactForm = $('.pane-campaign-sign-up');
   $('.s0 #webform').append(contactForm);

  // on lines 9-10 terrible things happen
  $('#campaign-opt-in br').remove();
  $('.ctia_top').append('&nbsp;');
	
  $('#appHook a').click(function(){
    $('#appHook').fadeOut(1000);
    setTimeout("jQuery('#appIcons').show()", 1000);
    return false;
  });

  var local = "localhost:8080";
  var prod = "www.dosomething.org";
  var url = prod;

  if(document.URL == "http://" + url + "/picsforpets/mobile" || document.URL == "https://" + url + "/picsforpets/mobile"){
    $('.region-sidebar-first').hide();
  }

  // Contact Form
       var contactForm = $('.pane-campaign-sign-up');
      $('#header #contact-form').not('oneLove').addClass('oneLove').append(contactForm);
  
  // Overlay Share Popup
  var url = "http://www.dosomething.org/picsforpets?sid=53905";
  $(function(){
    if (location.href==url){
      $('#overlay-animals').dialog({width: 1050, height: 700, modal: true, resizable: false});
    }
  });

  // Overlay Skip Btn
  $('a#skip').click(function() {
      $('#overlay-animals').dialog('close')
  });

    // Overlay to Facebook Btn
    $('#overlay-share-btn').click(function() {
    $('#overlay-animals').dialog('close').queue(function() {
      Drupal.behaviors.fb.feed({
      feed_document: 'http://www.dosomething.org/picsforpets',
      feed_title: 'Animal Welfare',
      feed_picture: 'http://files.dosomething.org/files/u/home/official-doer1.png',
      feed_caption: 'I’m a beast at protecting animals. How about you?',
      feed_description: 'Take a photo to save a shelter animal’s life.',
      feed_modal: true
       }, function(response) {
         }); 
            });
                });

    // Animal Stories Popup Close
      $('.close').click(function() { 
        $('.animal-stories').dialog('close') 
      });

    } // end attach: function
  }; // end Drupal.behaviors
})(jQuery); // end function ($)