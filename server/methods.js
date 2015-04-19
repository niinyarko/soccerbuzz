Meteor.methods({
    insertPost: function (doc) {
      Posts.insert(doc, function(err, id){
      });
    },
    updatePost: function (id, doc) {
      Posts.update({_id: id}, doc, function(err, id) {
      });
    },
    removePost: function (postId) {
      Posts.remove(postId);
    },
    downvote: function (postId, userId) {
        check(userId, String);
        check(postId, String);

        Posts.update(postId, {
        $addToSet: {downvoters: userId},
        $inc: {score: -1}
        });
    },
    upvote: function (postId, userId) {
        check(userId, String);
        check(postId, String);

        Posts.update(postId, {
        $addToSet: {upvoters: userId},
        $inc: {score: 1}
        });
        
    }
})