Buzz.allow({
    insert: function (userId, doc) {
        return (userId);
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && fields[0] === "score");
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});

/*Comments.allow({
    insert: function (userId, doc) {
        return (userId);
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && doc.owner === userId);
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});*/

Meteor.users.allow({
    update: function (userId, doc, fields, modifier) {
        return (userId && doc._id === userId);
    }
});