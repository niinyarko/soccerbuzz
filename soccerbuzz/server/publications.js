Meteor.publish("allBuzzes", function(limit) {
    return Buzz.find({}, {limit: limit});
})

Meteor.publish("buzzComments", function() {
    return Comments.find();
})