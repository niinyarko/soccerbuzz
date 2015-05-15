/*Template.repliesTemplate.events({
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
};*/