Template.showBuzzTemplate.helpers({
    commentsCount: function (id) {
        return Comments.get(id).count();
    }
});
