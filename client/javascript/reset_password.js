
isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    swal('Please fill in all required fields.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        swal('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    else if (password !== confirm) {
        swal('Your two passwords are not equivalent.');
        return false;
    }
    else {
      return true;
    }
};

Template.ResetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
 
    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          swal('We are sorry but something went wrong.');
        } else {
          swal('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;
  }
});
