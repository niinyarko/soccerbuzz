/*Posts.allow({
    update: function (userId, doc, fields, modifier) {
        // return (userId && fields[0] === "score" || fields[0] === "upvoters" || userId === doc.owner);
        return userId && _.without(_.keys(doc), 'score').length === 0 || doc.owner === userId;
    }
});*/

Comments.allow({
    insert: function (userId, doc) {
        return (userId);
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && fields[0] === "likes" || "dislikes");
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});



Signups.allow({
    insert: function (userId, doc) {
        return true;
    }
});
