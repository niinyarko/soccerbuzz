Meteor.publish("allBuzzes", function() {
    return Buzz.find({});
})

/*Meteor.publish("buzzComments", function(buzzId) {
    return Comments.find({buzzId: buzzId});
})*/
Meteor.publish("buzzComments", function() {
    return Comments.find();
})