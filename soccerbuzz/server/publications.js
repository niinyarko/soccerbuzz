Meteor.publish("allBuzzes", function(limit) {
    return Buzz.find({}, {sort: {createdAt: -1}, limit: limit});
})

Meteor.publish("buzzComments", function() {
    return Comments.find({}, {sort: {createdAt: -1}});
})

Meteor.publish("commentReplies", function() {
    return Replies.find({}, {sort: {createdAt: -1}});
})