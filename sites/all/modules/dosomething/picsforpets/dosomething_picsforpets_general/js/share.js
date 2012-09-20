Drupal.behaviors.dsPfpShare = {
  adjectives: $('meta[property=cpj]').attr('content'),
  pname: $('meta[property=cpn]').attr('content'),
  pimg: $('.field-name-field-fb-app-image img').attr('src'),

  attach: function (context, settings) {

    // Retrieve the id of this webform submission.
    if (settings.fbappsAnimals.images == undefined) {
      var sid = settings.fbappsAnimals.sid;
    }
    else {
      var sid = settings.fbappsAnimals.images[settings.fbappsAnimals.index].sid;
    }

    // Grab some metadata.
    var pictureUrl = $('.field-name-field-fb-app-image img').attr('src');
    var petName = $('.hi-pet-name p').text();
    var threeWords = [];
    jQuery.each($('.field-name-field-fb-app-three-words .field-items').children(), function() {
      threeWords.push($(this).text());
    });

    // Use the 'feed' method because it allows us to post metadata.
    var shareUrl = settings.picsforpetsFBAuth.app_secure_url + '/submit-pet-picture/submission/' + sid;
    var share = {
      method: 'feed',
      name: 'DoSomething.org\'s Pics For Pets',
      link: shareUrl,
      picture: pictureUrl,
      caption: petName + " I'm " + threeWords[0] + ", " + threeWords[1] + ", and " + threeWords[2],
      description: "Do Something about homeless animals, share photos of shelter pets and help them find homes. The more shares a pet gets the better chance it'll be adopted, their shelter will also be rewarded for every share!"
    };

    $('#picsforpets-share').click(function () {
      var pname = Drupal.behaviors.dsPfpShare.pname;
      var adjectives = Drupal.behaviors.dsPfpShare.adjectives;
      var pimg = Drupal.behaviors.dsPfpShare.pimg;

      FB.api(
        '/me/dosomethingapp:share',
        'post',
        {
            pet_who_needs_a_home: document.location.href,
            pet_name: pname,
            pet_adjectives: adjectives,
            image: pimg
        },
    //FB.ui(share,
      function(response) {
        // If the share was unsuccessful or the user clicked cancel, response
        // will be undefined. Otherwise it will be an object that contains the
        // post_id of the share.
        if ((typeof response !== 'undefined') && (response !== null)) {
          // Use FB's JS SDK to retrieve and store the user's facebook id.
          var fbuid = FB.getUserID();
          // Make POST request to this URL to update the share count on the
          // webform submission, passing in the webform submission id and the
          // user's facebook id as URL arguments.
          $.post('/fb/pics-for-pets/share/js/' + sid + '/' + fbuid, function (userShares) {
            // Increment the displayed share count.
            var count = $('.picsforpets-share-count').text();
            count++;
            $('.picsforpets-share-count').text(count);
            $('.fb-share-me').text('Shared!');
            var titles = {
              200  : '200 shares gets me a toy!',
              500  : '500 shares gets me food!',
              1000 : '1000 Shares gets me a bed!'
            };
  
            for (i in titles) {
              if (count < i) {
                $('#picsforpets-share').find('h1').html(titles[i]);
                break;
              }
            }

            // Display a modal dialog depending on the total number of shares
            // the user has made.
            if (userShares == 3 && !settings.picsforpetsGeneral.furtographer) {
              $loader = $('<div></div>');
              $loader.load('/fb/pics-for-pets/ajax/thanks-for-sharing?sid=' + sid + ' #dosomething-picsforpets-general-thanks-form', function() {
                if ($('html').hasClass('ie9') || $('html').hasClass('ie8') || $('html').hasClass('ie7') || $('html').hasClass('ie6')) {
                  $cellval = $loader.find('#edit-cell')
                  $emailval = $loader.find('#edit-email');
                  $cellval.val('Cell:');
                  $emailval.val('Email:');
                  $cellval.focus(function() {
                    if ($(this).val() == 'Cell:') {
                      $(this).val('');
                    }
                  });
                  $emailval.focus(function() {
                    if ($(this).val() == 'Email:') {
                      $(this).val('');
                    }
                  });
                  $cellval.blur(function() {
                    if ($(this).val() == '') {
                      $(this).val('Cell:');
                    }
                  });
                  $emailval.blur(function() {
                    if ($(this).val() == '') {
                      $(this).val('Email:');
                    }
                  });
                }
              });
              $loader.find('#edit-cell').val('cell');
              $loader.dialog({
                  title: Drupal.t('Thanks for sharing!'),
                  resizable: false,
                  draggable: false,
                  modal: true,
                  top: 180,
                  width: 550,
                  position: { my: 'top', at: 'top', of: 'body', offset: '0 180' },
                  open: function(event, ui) {
                    if (typeof FB != 'undefined') { 
                      FB.Canvas.scrollTo(0,0);
                    }
                  }
                });
            }
            else if (userShares == 5) {
              $inviteDialog = $('<div class="invite-modal"></div>');
              $inviteDialog.load('/fb/pics-for-pets/ajax/invite-friends #dosomething-picsforpets-invite-form', function() {
                  $('#picsforpets-invite-friends').click(function() {
                    // We don't actually care what they click after they get
                    // into the invite friends FB dialog. So if they click the
                    // button we'll close the dialog no matter what.
                    $inviteDialog.dialog('close');
                    FB.ui({
                      method: 'apprequests',
                      display: 'iframe',
                      title: "DoSomething.org's Pics for Pets",
                      message: 'You’ve been invited to help find shelter animals a new home with Pics for Pets. The more shares, the more food and toy donations the animals can get for their shelters. Help animals find a home!',
                      access_token: settings.picsforpetsFBAuth.access_token,
                      show_error: true
                    });
                  });
                })
                .dialog({
                  title: Drupal.t('Hey, you\'ve shared 5 animals!'),
                  resizable: false,
                  draggable: false,
                  modal: true,
                  top: 180,
                  width: 550,
                  position: { my: 'top', at: 'top', of: 'body', offset: '0 180' },
                  open: function(event, ui) {
                    if (typeof FB != 'undefined') { 
                      FB.Canvas.scrollTo(0,0);
                    }
                  }
                }
              );
            }
          });
        }
      });
    });
  },

  update_attrs: function(image, name, adjectives) {
    this.pname = name;
    this.pimg = image;
    this.adjectives = adjectives;
  }
};

}(jQuery));
