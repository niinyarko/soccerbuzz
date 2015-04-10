/*Template.streamTemplate.events({
  "click [data-action='facebook-share']": function (e,t) {
    // var url = e.currentTarget.data('url');
    var url = e.currentTarget.getAttribute('data-url');
    var _id = e.currentTarget.id;
    FB.ui({
      display: 'popup',
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
          object: url,
      })
    }, function(response){});
  }
});*/

Template.streamTemplate.events({
  "click [data-action='load-btn']": function(event, instance) {
      event.preventDefault();

          // get current value for limit, i.e. how many posts are currently displayed
          var limit = instance.limit.get();

          // increase limit by 5 and update it
          limit += 5;
          instance.limit.set(limit);
  },

});




Template.insertBuzzForm.events({
  "keyup textarea#caption": function () {
    var l = 140;
    var str = $("textarea#caption").val();
     var len = str.length;
     if(len <= l) {
           $("#txtLen").val(l-len);
      } else {
           $("textarea#caption").val(str.substr(0, 140));
      }
  }
});

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
  "hidden.bs.modal #buzzModal": function(e,t) {
    /*$("#insertBuzzForm").trigger('reset');
    $("#imageThumbnail").find('img').attr("src", "");*/
    // $(this).removeData('bs.modal');
    $("#imageThumbnail").find('img').attr("src", "");
    $("#imageThumbnail").hide();
    $("#buzzModal").find('#insertBuzzForm')[0].reset();;

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
   
  }
  /*"click [data-action='load-btn']": function() {
    handle.loadNextPage();
  }*/,
  "click [ data-action='increment']": function() {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var postId = this._id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
  
      if (typeof(checkVoteStatus) == "undefined") {
           Posts.update(postId, {$inc: {score: 1} });
           Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": postId}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedInc) == "undefined") {
          Posts.update(postId, {$inc: {score: 1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": postId}});
      }
      else {
        if(checkIfVotedInc(userId, postId)) {
          $("[ data-action='increment']").toggleClass("hasVoted");
          if ($("[ data-action='increment']").hasClass("hasVoted")){
            Posts.update(postId, {$inc: {score: -1} });
          }
          else {
            Posts.update(postId, {$inc: {score: 1} });
          }
        }
        else {
          Posts.update(postId, {$inc: {score: 1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedInc": postId}})
          return;
        }
      }
}
},
  "click [ data-action='decrement']": function() {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var postId = this._id;
    var userId = Meteor.userId();
    var checkVoteStatus = Meteor.users.findOne(userId).profile;
  
      if (typeof(checkVoteStatus) == "undefined") {
           Posts.update(postId, {$inc: {score: -1} });
           Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": postId}});
    }
    else {
      if (typeof(checkVoteStatus.alreadyVotedDec) == "undefined") {
          Posts.update(postId, {$inc: {score: -1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": postId}});
      }
      else {
        if(checkIfVotedDec(userId, postId)) {
          $("[ data-action='decrement']").toggleClass("hasVoted");
          if ($("[ data-action='decrement']").hasClass("hasVoted")){
            Posts.update(postId, {$inc: {score: 1} });
          }
          else {
            Posts.update(postId, {$inc: {score: -1} });
          }
        }
        else {
          Posts.update(postId, {$inc: {score: -1} });
          Meteor.users.update(Meteor.userId(), {$push: {"profile.alreadyVotedDec": postId}});
          return;
        }
      }
}
}

})

checkIfVotedInc = function(userId, postId) {
  var alreadyVoted = Meteor.users.findOne(userId).profile.alreadyVotedInc;
       for (var i=0; i < alreadyVoted.length; i++) {
          if (alreadyVoted[i] == postId) {
            return true;
    }
    }
};

checkIfVotedDec = function(userId, postId) {
  var alreadyVoted = Meteor.users.findOne(userId).profile.alreadyVotedDec;
       for (var i=0; i < alreadyVoted.length; i++) {
          if (alreadyVoted[i] == postId) {
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

Template.showBuzzTemplate.rendered = function () {
  try {
      FB.XFBML.parse();
  }catch(e) {} 
};

Template.home.rendered = function () {
  try {
      FB.XFBML.parse();
  }catch(e) {}
};
