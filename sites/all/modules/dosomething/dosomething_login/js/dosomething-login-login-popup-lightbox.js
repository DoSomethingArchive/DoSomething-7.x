(function ($) {

Drupal.behaviors.dosomethingLoginLogin = {
  attach: function (context, settings) {
    var loginForm = $('#dosomething-login-login-popup-form')
      .hide();
    $('.sign-in-popup').click(function (event) {
      loginForm.dialog({
        resizable: false,
        draggable: false,
        modal: true,
        width: 550,
      });
      event.preventDefault();
    });
  }
};

}(jQuery));
