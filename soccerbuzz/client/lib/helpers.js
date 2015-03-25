Meteor.subscribe("users");
Meteor.subscribe("commentReplies");
Meteor.subscribe("buzzComments")

Template.registerHelper("commentsCount", function(id) {
  var commentsByDoc = Comments.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var repliesToComment = Replies.find({buzzId: id},{sort: {createdAt: -1}}).count();
  var totalCount = commentsByDoc + repliesToComment;
  return totalCount;
})

Template.registerHelper("commentString", function(id) {
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
      var buzzId = this._id;
      return Comments.find({buzzId: buzzId});
    }
});


Template.registerHelper("username", function() {
  if(this.comment) {
      var commentId = this._id;
      var ownerId = Comments.findOne(commentId).owner;
      var owner = Meteor.users.findOne(ownerId);

      if(typeof(owner.profile || owner.profile.name) == "undefined") {
        var userEmail = Meteor.users.findOne(owner).emails[0].address;
        var index = userEmail.indexOf("@");
        var name = userEmail.slice(0, index);
        return name;
      }
      else {
        var name = owner.profile.name
        return name;
      }
  }
  else {
    var replyId = this._id;
    var ownerId = Replies.findOne(replyId).owner;
    var owner = Meteor.users.findOne(ownerId);
    if (typeof(owner.profile || owner.profile.name) == "undefined") {
      var userEmail = Meteor.users.findOne(owner).emails[0].address;
      var index = userEmail.indexOf("@");
      var name = userEmail.slice(0, index);
      return name;
    }
    else {
      var name = owner.profile.name
      return name;
    }
  }
})

Template.repliesTemplate.helpers({
    replies: function () {
      var commentId = this._id;
      return Replies.find({commentId: commentId});
    }
});


Template.showBuzzTemplate.helpers({
    formatedCaption: function () {
     var caption = this.buzz.caption;
     return caption.replace(/\s+/g, '-').toLowerCase();
    }
});






