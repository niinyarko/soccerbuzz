Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  console.log(user);
  console.log(options);
  if (options.profile) {
      options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
       user.profile = options.profile;
  }

  else {
   //user.profile = options.profile ? options.profile : {};
     user.profile = {};
  }
    return user;
});
