Meteor.publish('posts', function(limit) {
  Meteor._sleepForMs(2000);
  return Posts.find({}, {limit: limit});
});

Meteor.publish("buzzComments", Meteor.bindEnvironment(function() {
    return Comments.find({}, {sort: {createdAt: -1}});
}, function(e){
    throw(e);
}));

Meteor.publish("commentReplies", Meteor.bindEnvironment(function() {
    return Replies.find({}, {sort: {createdAt: -1}});
}, function(e){
    throw(e);
}));

Meteor.publish("users", Meteor.bindEnvironment(function() {
    return Meteor.users.find();
}, function(e){
    throw(e);
}));