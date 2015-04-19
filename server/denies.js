Posts.deny({
    insert: function (userId, doc) {
        //...
    },
    update: function (userId, doc, fields, modifier) {
        console.log(modifier);
    },
    remove: function (userId, doc) {
        //...
    }
});