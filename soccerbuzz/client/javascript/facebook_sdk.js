if(Meteor.isClient) {
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '911652492188133',
          xfbml      : true,
          version    : 'v2.1'
        });
      };
}