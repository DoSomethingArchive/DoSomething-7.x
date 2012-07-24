var url_base = 'http://www.dosomething.org/sites/all/modules/dosomething/dosomething_campaign_styles/campaign_styles/2012/thumb/new/';
var sign_up_form = jQuery('#webform-client-form-722126');

//Main content
jQuery.post(url_base + 'content.php', function (data) {
  jQuery('div[role="main"]').html(data);
  init_content();
});

// sidebar
jQuery.post(url_base + 'sidebar.php', function (data) {
  jQuery('.region-sidebar-first').html(data);
  jQuery('.region-sidebar-first .contact_form-aside').append(sign_up_form);
});


function init_content() {
  var $window = jQuery(window);
  var $nav = jQuery('.region-sidebar-first');
  var scrollLimit = 180;

  $window.scroll(function () {
    if ($window.scrollTop() > scrollLimit) {
      $nav
        .css('position', 'fixed')
        .css('top', '10px')
        .css('margin-top', 0);
    }
    else {
      $nav
        .css('position', 'relative')
        .css('top', '0')
        .css('margin-top', '104px');
    }
  });

  $('.faq h4').next('p').css('display','none');
  $('.faq h4.activeFAQ').next('p').css('display','block');
  $('.faq h4').click(function(){
    if($(this).hasClass('activeFAQ')){
      $(this).removeClass().next('p').slideUp();
    }
    else{
      $(this).addClass('activeFAQ');
      $(this).siblings('h4').removeClass('activeFAQ');
      $(this).next('p').slideToggle();
      $(this).siblings().next('p').slideUp();      
    }
  });
  $('.learn1').mouseover(function(){
    $('.share-here1').css('display', 'block');
  }).mouseout(function(){
    $('.share-here1').css('display', 'none');
  });
  $('.learn2').mouseover(function(){
    $('.share-here2').css('display', 'block');
  }).mouseout(function(){
    $('.share-here2').css('display', 'none');
  });
  $('.learn3').mouseover(function(){
    $('.share-here3').css('display', 'block');
  }).mouseout(function(){
    $('.share-here3').css('display', 'none');
  });
  init_scroller();
  init_social();
}

function init_scroller() {
  $('.action-guide-picture:not(:first)').hide();
  $('#thumb-wars-action-guide-nav li').click(function () {
    var index = $(this).index() + 1;
    $('.action-guide-picture').hide();
    $('.action-guide-picture:nth-child('+index+')').show();
    activeButton();
  });
  activeButton();

  $('#action-guide-right').click(function () {
    var $current = $('.action-guide-picture:visible').hide();
    $next = $current.next();
    if ($next.length === 0) $next = $('.action-guide-picture:first');
    $next.show();
    activeButton();
    return false;
  });

  $('#action-guide-left').click(function () {
    var $current = $('.action-guide-picture:visible').hide();
    $prev = $current.prev();
    if ($prev.length === 0) $prev = $('.action-guide-picture:last');
    $prev.show();
    activeButton();
    return false;
  });
}

function activeButton() {
  var index = $('.action-guide-picture:visible').index('.action-guide-picture') + 1;
  $('.action-guide-circle').removeClass('active');
  $('.action-guide-circle:nth-child('+index+')').addClass('active');
}

function init_social() {
  var $shareTop = $('#top-fb-share');
  var $share1 = $('.share1 .social-f');
  var $share2 = $('.share2 .social-f');
  var $share3 = $('.share3 .social-f');

  $shareTop.click(function () {
    var fbObj = {
      method: 'feed',
      link: 'http://www.dosomething.org/thumbwars?rel=betaTop',
      picture: 'http://files.dosomething.org/files/styles/thumbnail/public/fb_thumbs_0.jpg',
      name: 'Thumb Wars',
      description: 'Save your friends from the dangers of texting and driving with thumb socks, and even win scholarship money! Click here to join Do Something\'s Thumb Wars now!'
    };
    FB.ui(fbObj);
    return false;
  });

  $share1.click(function () {
    return shareClick(1, 'Drivers under 20 years old are most likely to get into a distracted driving crash.');
  });
  $share2.click(function () {
    return shareClick(2, 'At 55 mph, sending or receiving a text can take a driver\'s eyes off the road for the length of an entire football field.');
  });
  $share3.click(function () {
    return shareClick(3, 'Texting drivers are 23 times more likely to get involved in a crash.');
  });
}

function shareClick(num, captionText) {
  var fbObj = {
    method: 'feed',
    link: 'http://www.dosomething.org/thumbwars?rel=betaShare'+num,
    picture: 'http://files.dosomething.org/files/styles/thumbnail/public/fb_thumbs_0.jpg',
    name: 'Thumb Wars',
    caption: captionText,
    description: 'Save your friends from the dangers of texting and driving with thumb socks, and even win scholarship money! Click here to join Do Something\'s Thumb Wars now!'
  };
  FB.ui(fbObj);
  return false;
}
