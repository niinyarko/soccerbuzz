Template.profile.events({
    "click [data-action='new-buzz']": function() {
        $("#buzzModal").modal("show");
    }
})


Template.navbar.events({
   "click [data-action='signin-btn-small']": function() {
        $("#loginModal").modal("show");
    },
    "click [data-action='signin-btn']": function() {
        $("nav").removeClass("navbar-fixed-top");
        $("#overlay").show();
    },
    "click [data-action='signout-btn']": function() {
    Meteor.logout(function() {
      // Redirect to login
      Router.go('home');
    });
  },
    "click [data-action='new-buzz']": function() {
    $("#buzzModal").modal("show");
  },
  "click [data-action='overlay-close']": function() {
        $("nav").addClass("navbar-fixed-top");
        $("#overlay").hide();
    }
})

Template.loginButtonsTemplate.events({
  'click .button-facebook': function() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .button-twitter': function() {
    return Meteor.loginWithTwitter(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },

  "click [data-action='google-auth']": function() {
    return Meteor.loginWithGoogle(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },

  "click [data-action='email-auth']": function() {
        $("#signinForm").toggle();
    }
});

Template.modalLogin.events({
  'click .button-facebook': function() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .button-twitter': function() {
    return Meteor.loginWithTwitter(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },

  "click [data-action='google-auth']": function() {
    return Meteor.loginWithGoogle(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },

  "click [data-action='email-auth']": function() {
        $("#signinForm").toggle();
    }
});

Accounts.onLogin(function() {
  $("#loginModal").modal("hide");
  $("#overlay").hide();
  Router.go("home");
});

Accounts.onLogout(function() {
  Router.go("home");
});


Template.home.events({
  "click [data-action='showImage']": function(e,t) {
    var imageId = e.currentTarget.id;
    Session.set("imageId", imageId);
    $("#imageOverlay").show();
  },
  "click [data-action='cta-upload-btn']": function() {
    if(!Meteor.user()) {
      swal("Please signin to upload your image.");
    }
    else {
       $("#buzzModal").modal("show");
    }
   
  },
  "click [data-action='load-btn']": function() {
    handle.loadNextPage();
  }
})

Template.showBuzzTemplate.events({
  "click [data-action='comments-toggle']": function() {
    $("#commentsShow").toggleClass("hide-comments");
    var txt =  $("#commentsShow").hasClass('') ? 'Hide Comments' : 'Show Comments'
    $(".btn-toggle").html("<p>" + txt + "</p>");  
  },
  "click [data-action='add-comment']": function() {
    swal("Sorry! you need to signin to comment");
  }
})

Template.home.rendered = function () {
   window.fbAsyncInit = function() {
        FB.init({
          appId      : '911652492188133',
          xfbml      : true,
          version    : 'v2.1'
        });
      };
};