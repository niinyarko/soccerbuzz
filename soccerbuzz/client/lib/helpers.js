/*Template.showBuzzTemplate.helpers({
    commentsCount: function (id) {
        return Comments.get(id).count();
    },
    commentString: function(id) {
        if (Comments.get(id).count() == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
    }
});

Template.home.helpers({
    commentsCount: function () {
        return Comments.get(this._id).count();
    },
    commentString: function() {
        if (Comments.get(this._id).count() == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
    },
    scoreString: function(score) {
        if (score == 1) {
            return "point";
        }
        else {
            return "points";
        }
    }
});*/ 


Template.registerHelper("commentsCount", function(id) {
  Meteor.subscribe("commentReplies");
  var commentsByDoc = Comments.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var repliesToComment = Replies.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var totalCount = commentsByDoc + repliesToComment;
  return totalCount;
})

Template.registerHelper("commentString", function(id) {
  Meteor.subscribe("commentReplies");
  var commentsByDoc = Comments.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var repliesToComment = Replies.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var totalCount = commentsByDoc + repliesToComment;
    if (totalCount == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
})

Template.registerHelper("scoreString", function(score){
  if (score == 1) {
      return "point";
  }
  else {
      return "points";
  }
})
Template.commentsTemplate.helpers({
    imageUrl: function () {
        var email = 'niinyarko@yahoo.com';
        var options = { 
            secure: true 
        };
        var url = Gravatar.imageUrl(email, options);
        return url;
    },
    comments: function () {
      Meteor.subscribe("buzzComments")
      var buzzId = this._id;
      return Comments.find({buzzId: buzzId});
    },
    username: function (id) {
      var owner = Comments.findOne(id).owner;
      var username = Meteor.users.findOne(owner).profile.name;
      if (typeof(username) == "undefined") {
        var userEmail = Meteor.users.findOne(owner).emails[0].address;
        var index = userEmail.indexOf("@");
        var name = userEmail.slice(0, index);
        return name;
      }
      else {
        return username;
      }
    }
});

Template.repliesTemplate.helpers({
    replies: function () {
      Meteor.subscribe("commentReplies")
      var commentId = this._id;
      return Replies.find({commentId: commentId});
    },
    username: function (id) {
      var owner = Replies.findOne(id).owner;
      var username = Meteor.users.findOne(owner).profile.name;
      if (typeof(username) == "undefined") {
        var userEmail = Meteor.users.findOne(owner).emails[0].address;
        var index = userEmail.indexOf("@");
        var name = userEmail.slice(0, index);
        return name;
      }
      else {
        return username;
      }
    }
});






