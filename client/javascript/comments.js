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