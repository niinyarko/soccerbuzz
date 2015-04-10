Meteor.startup(function () {
  
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.smtp.username) + ':' + encodeURIComponent(Meteor.settings.smtp.password) + '@' + encodeURIComponent(Meteor.settings.smtp.server) + ':' + Meteor.settings.smtp.port;

    Accounts.emailTemplates.from = 'SoccaBuzz <no-reply@soccabuzz.com>';

    Accounts.emailTemplates.siteName = 'soccabuzz.com';

    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Welcome to SoccaBuzz';
      };

    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
       return "You have registered to be part of our awesome community!"
         + " To activate your account, simply click the link below:\n\n"
         + url;
    };

    Accounts.emailTemplates.resetPassword.from = function (user) {
        return 'SoccaBuzz <no-reply@soccabuzz.com>';
    };

    Accounts.emailTemplates.resetPassword.subject = function(user) {
        return "How to reset your soccabuzz password"
     };

    Accounts.emailTemplates.resetPassword.text = function(user, url) {
        return "Hello soccabuzz user! You have requested to reset your password. Simply click the link below to enter your new password.\n\n"
        + url
     };
});


(function () {
    "use strict";

    Accounts.urls.resetPassword = function (token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };

})();
