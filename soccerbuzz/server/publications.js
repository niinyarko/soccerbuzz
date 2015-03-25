Meteor.publish("allBuzzes", Meteor.bindEnvironment(function(limit) {
    return Buzz.find({}, {sort: {createdAt: -1}, limit: limit});
}, function(e){
    throw(e);
}));

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