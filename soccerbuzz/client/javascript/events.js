Template.commentsTemplate.events({
  'click .reply-action': function (e) {
    var commentId = e.currentTarget.id;
    Session.set("commentId", commentId);
    checkId = $(".replies-box").attr("id");

    $('.replies-box-hide').each(function(){
        if( $(this).find('div.replies-box').attr("id") == commentId ) {
          $(this).removeClass('replies-box-hide');
      }
    });
  },
  "click .thumbs-up-action-comment": function(e) {
    var _id = e.currentTarget.id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
    
      if (typeof(checkVoteStatus) == "undefined") {
           Comments.update(_id, {$inc: {likes: 1}});
           Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedInc) == "undefined") {
          Comments.update(_id, {$inc: {likes: 1} });
          Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
      }
      else {
        if(checkIfVotedInc(userId, _id)) {
          $(".thumbs-up-action-comment").toggleClass("hasVoted");
          if($(".thumbs-up-action-comment").hasClass("hasVoted")) {
              Comments.update(_id, {$inc: {likes: -1} });
          }
          else {
            Comments.update(_id, {$inc: {likes: 1} });
          }
        }
        else {
          Comments.update(_id, {$inc: {likes: 1}});
          Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
        }
      }
  }
},
  "click .thumbs-down-action-comment": function(e) {
    var _id = e.currentTarget.id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
    
      if (typeof(checkVoteStatus) == "undefined") {
           Comments.update(_id, {$inc: {dislikes: 1}});
           Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedDec) == "undefined") {
          Comments.update(_id, {$inc: {dislikes: 1} });
          Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
      }
      else {
        if(checkIfVotedDec(userId, _id)) {
          $(".thumbs-down-action-comment").toggleClass("hasVoted");
          if($(".thumbs-down-action-comment").hasClass("hasVoted")) {
              Comments.update(_id, {$inc: {dislikes: -1} });
          }
          else {
            Comments.update(_id, {$inc: {dislikes: 1} });
          }
        }
        else {
          Comments.update(_id, {$inc: {dislikes: 1}});
          Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
        }
      }
  }
}
});

Template.repliesTemplate.events({
  'click .thumbs-up-reply': function (e) {
    var _id = e.currentTarget.id;
      var userId = Meteor.userId();
      var checkVoteStatus = Meteor.users.findOne(userId).profile;
      
        if (typeof(checkVoteStatus) == "undefined") {
             Replies.update(_id, {$inc: {likes: 1}});
             Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
      }
      else {
        if (typeof(checkVoteStatus.alreadyVotedInc) == "undefined") {
            Replies.update(_id, {$inc: {likes: 1} });
            Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
        }
        else {
          if(checkIfVotedInc(userId, _id)) {
            $(".thumbs-up-reply").toggleClass("hasVoted");
            if($(".thumbs-up-reply").hasClass("hasVoted")) {
                Replies.update(_id, {$inc: {likes: -1} });
            }
            else {
                Replies.update(_id, {$inc: {likes: 1} });
            }
          }
          else {
            Replies.update(_id, {$inc: {likes: 1}});
            Meteor.users.update(userId, {$push: {"profile.alreadyVotedInc": _id}});
          }
        }
    }

  },
  'click .thumbs-down-reply': function (e) {
    var _id = e.currentTarget.id;
      var userId = Meteor.userId();
      var checkVoteStatus = Meteor.users.findOne(userId).profile;
      
        if (typeof(checkVoteStatus) == "undefined") {
             Replies.update(_id, {$inc: {dislikes: 1}});
             Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
      }
      else {
        if (typeof(checkVoteStatus.alreadyVotedDec) == "undefined") {
            Replies.update(_id, {$inc: {dislikes: 1} });
            Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
        }
        else {
          if(checkIfVotedDec(userId, _id)) {
            $(".thumbs-down-reply").toggleClass("hasVoted");
            if($(".thumbs-down-reply").hasClass("hasVoted")) {
                Replies.update(_id, {$inc: {dislikes: -1} });
            }
            else {
                Replies.update(_id, {$inc: {dislikes: 1} });
            }
          }
          else {
            Replies.update(_id, {$inc: {dislikes: 1}});
            Meteor.users.update(userId, {$push: {"profile.alreadyVotedDec": _id}});
          }
        }
    }

  }
});


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

  "click .button-google": function() {
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

Template.loginModalPop.events({
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

  "click .button-google": function() {
    return Meteor.loginWithGoogle(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },

  "click #email-options": function() {
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
  $("#popLogin").modal("hide");
  Router.go("home");
});

Accounts.onLogout(function() {
  Router.go("home");
});

Template.buzzModal.events({
  "hidden.bs.modal #buzzModal": function() {
    $("#insertBuzzForm").trigger('reset');
    $("#imageThumbnail").find('img').attr("src", "");
  }
})

Template.home.events({
  "click [data-action='showImage']": function(e,t) {
    var imageId = e.currentTarget.id;
    Session.set("imageId", imageId);
    $("#imageOverlay").show();
  },
  "click [data-action='cta-upload-btn']": function() {
    if(!Meteor.user()) {
      $("#popLogin").modal("show")
    }
    else {
       $("#buzzModal").modal("show");
    }
   
  },
  "click [data-action='load-btn']": function() {
    handle.loadNextPage();
  },
  "click [ data-action='increment']": function() {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var buzzId = this._id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
  
      if (typeof(checkVoteStatus) == "undefined") {
           Buzz.update(buzzId, {$inc: {score: 1} });
           Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": buzzId}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedInc) == "undefined") {
          Buzz.update(buzzId, {$inc: {score: 1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": buzzId}});
      }
      else {
        if(checkIfVotedInc(userId, buzzId)) {
          $("[ data-action='increment']").toggleClass("hasVoted");
          if ($("[ data-action='increment']").hasClass("hasVoted")){
            Buzz.update(buzzId, {$inc: {score: -1} });
          }
          else {
            Buzz.update(buzzId, {$inc: {score: 1} });
          }
        }
        else {
          Buzz.update(buzzId, {$inc: {score: 1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": buzzId}})
          return;
        }
      }
}
},
  "click [ data-action='decrement']": function() {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var buzzId = this._id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
  
      if (typeof(checkVoteStatus) == "undefined") {
           Buzz.update(buzzId, {$inc: {score: -1} });
           Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": buzzId}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedDec) == "undefined") {
          Buzz.update(buzzId, {$inc: {score: -1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": buzzId}});
      }
      else {
        if(checkIfVotedDec(userId, buzzId)) {
          $("[ data-action='decrement']").toggleClass("hasVoted");
          if ($("[ data-action='decrement']").hasClass("hasVoted")){
            Buzz.update(buzzId, {$inc: {score: 1} });
          }
          else {
            Buzz.update(buzzId, {$inc: {score: -1} });
          }
        }
        else {
          Buzz.update(buzzId, {$inc: {score: -1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": buzzId}});
          return;
        }
      }
}
}

})

checkIfVotedInc = function(userId, buzzId) {
  var alreadyVoted = Meteor.users.findOne(userId).profile.alreadyVotedInc;
       for (var i=0; i < alreadyVoted.length; i++) {
          if (alreadyVoted[i] == buzzId) {
            return true;
    }
    }
};

checkIfVotedDec = function(userId, buzzId) {
  var alreadyVoted = Meteor.users.findOne(userId).profile.alreadyVotedDec;
       for (var i=0; i < alreadyVoted.length; i++) {
          if (alreadyVoted[i] == buzzId) {
            return true;
    }
    }
};

Template.showBuzzTemplate.events({
  "click [data-action='comments-toggle']": function() {
    $("#commentsShow").toggleClass("hide-comments");
    var txt =  $("#commentsShow").hasClass('') ? 'Hide Comments' : 'Show Comments'
    $(".btn-toggle").html("<p>" + txt + "</p>");  
  },
  "click [data-action='add-comment']": function() {
    if(!Meteor.user()) {
    swal("Sorry! you need to signin to comment");
  }
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
