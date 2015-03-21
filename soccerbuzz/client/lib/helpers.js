Template.showBuzzTemplate.helpers({
    commentsCount: function (id) {
        return Comments.get(id).count();
    },
    commentString: function(id) {
        if (Comments.get(id).count() == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
    }
});

Template.home.helpers({
    commentsCount: function () {
        return Comments.get(this._id).count();
    },
    commentString: function() {
        if (Comments.get(this._id).count() == 1) {
            return "comment";
        }
        else {
            return "comments";
        }
    },
    scoreString: function(score) {
        if (score == 1) {
            return "point";
        }
        else {
            return "points";
        }
    }
});


