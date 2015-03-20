Meteor.publish("allBuzzes", function(limit) {
    return Buzz.find({}, {sort: {createdAt: -1}, limit: limit});
})

Meteor.publish("buzzComments", function() {
    return Comments.find();
})