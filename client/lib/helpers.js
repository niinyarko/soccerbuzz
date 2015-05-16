// Meteor.subscribe("users");

/*Template.registerHelper("commentsCount", function(id) {
  var commentsByDoc = Comments.find({postId: id},{sort: {createdAt: -1}}).count();
  var repliesToComment = Replies.find({postId: id},{sort: {createdAt: -1}}).count();
  var totalCount = commentsByDoc + repliesToComment;
  return totalCount;
})

Template.registerHelper("commentString", function(id) {
  var commentsByDoc = Comments.find({postId: id},{sort: {createdAt: -1}}).count();
  var repliesToComment = Replies.find({postId: id},{sort: {createdAt: -1}}).count();
  var totalCount = commentsByDoc + repliesToComment;
    if (totalCount == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
})*/

Template.editPost.helpers({
  post: function () {
    return Session.get('editPost');
  }
})

Template.registerHelper('profileName', function() {
  var user = Meteor.user();
  var name = user.profile.username;
  return name;
})

Template.registerHelper('userPic', function(){
    var user = Meteor.user();
    var picture = user.profile.picture;
    return picture;
})
Template.registerHelper('imgWidth', function() {
    var user = Meteor.user();
    var picture = user.profile.picture;
    if (typeof(picture) == "undefined") {
      return 0;
    }
    else {
      return 30;
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

Template.registerHelper('postsCountString', function(count){
  if (count == 1) {
    return "Post"
  }
  else {
    return "Posts"
  }
})

Template.registerHelper('upvotesCountString', function(count){
  if (count == 1) {
    return "Upvote"
  }
  else {
    return "Upvotes"
  }
})

Template.registerHelper('noPosts', function(count) {
  if (count == 0) {
    return true;
  }
})

Template.registerHelper('noUpvotes', function(votesCount) {
    if (votesCount == 0) {
      return true;
    }
})

Template.registerHelper('currentUser', function(){
  return Meteor.userId();
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
     var caption = this.post.caption;
     return caption.replace(/\s+/g, '-').toLowerCase();
    }
});


Template.registerHelper('getPicture', function(id){
      var post = Posts.findOne(id);
      var picture = post.imageUrl;
      return picture;
})

Template.registerHelper('getDescription', function(id){
      var post = Posts.findOne(id);
      var caption = post.caption;
      return caption;
})

Template.registerHelper('getName', function(id){
      var post = Posts.findOne(id);
      var name = post.caption;
      return name;
})

