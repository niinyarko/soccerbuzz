Template.registerHelper("username", function(id) {
     var ownerId = Buzz.findOne(id).owner;
    var username = Meteor.users.findOne(ownerId).profile.name;
    return username;
})

Template.registerHelper("buzzComments", function(id) {
    Meteor.subscribe("buzzComments")
     var comments = Comments.find({buzzId: id});
     // console.log(comments.count());
    return  comments;
})

Template.registerHelper("commenter", function(id) {
    return Meteor.users.findOne(id).profile.name;
})

Template.registerHelper("isComments", function(id) {
     var check = Comments.find({buzzId: id}).count();
        if(check > 0) {
            return true
        }
})