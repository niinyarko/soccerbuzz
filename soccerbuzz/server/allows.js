Buzz.allow({
    insert: function (userId, doc) {
        return (userId);
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && doc.owner === userId);
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});

Comments.allow({
    insert: function (userId, doc) {
        return (userId);
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && doc.owner === userId);
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});