Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  // user.profile = options.profile ? options.profile : {};
  console.log(options);
  console.log(user);
  if (user.services.facebook) {
       user.profile = options.profile;
       user.profile.username = options.profile.name;
       user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  }

  else if (user.services.twitter){
        user.profile = options.profile;
        user.profile.picture= user.services.twitter.profile_image_url_https;
        user.profile.username= user.services.twitter.screenName;
    }
  else if (user.services.google) {
         user.profile = options.profile;
         user.profile.username = options.profile.name;
         user.profile.picture = user.services.google.picture;
      }

  else {
   //user.profile = options.profile ? options.profile : {};
     user.profile = {};
  }
    return user;
});
