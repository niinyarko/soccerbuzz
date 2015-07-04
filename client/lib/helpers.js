Meteor.subscribe("users");
Meteor.subscribe("posts", 0);

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

Template.registerHelper('profilePicture', function(userId){
    var _id = userId;
    var user = Meteor.users.findOne(_id);
    var picture = user.profile.picture;
    if (typeof(picture) == "undefined") {
      return "/default-avatar.png";
    }
    else {
      return picture;
    }
})

Template.registerHelper('buzzowner', function(postId){
  var postId = postId;
  var post = Posts.findOne(postId);
  console.log(post);
  var ownerId = post.owner;
   console.log(ownerId);
  var user = Meteor.users.findOne(ownerId);
   console.log(user);
  var check_email = user.emails;
  if (typeof(check_email) == "undefined") {
    var full_name = user.profile.name;
    // var username = email.replace(/@.*$/,"");
    var tmp = full_name.split(" ");
    var username = tmp[0];
    return username;
  }
  else {
    var email = user.emails[0].address;
    var username = email.replace(/@.*$/,"");
    return username;
  }
 
})

Template.registerHelper('userProfileName', function(userId){
    var _id = userId;
    var user = Meteor.users.findOne(_id);
    var email = user.emails[0].address;
    var username = email.replace(/@.*$/,"");
    return username;
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

Template.registerHelper("getWidgetUrl", function(){
  return "http://www.fifa.com/flash/widgets/newsreader/app.swf?lang='en'"
})

// Template.registerHelper()
