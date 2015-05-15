Template.streamTemplate.created = function () {
    // 1. Initialization

     var instance = this;

     // initialize the reactive variables
     instance.loaded = new ReactiveVar(0);
     instance.limit = new ReactiveVar(5);
     instance.ready = new ReactiveVar(false);

     instance.autorun(function () {

        // get the limit
        var limit = instance.limit.get();

        console.log("Asking for "+limit+" posts…")

        // subscribe to the posts publication
        var subscription = Meteor.subscribe('posts', limit);

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
          console.log("> Received "+limit+" posts. \n\n")
          instance.loaded.set(limit);
          instance.ready.set(true);
        } else {
          instance.ready.set(false);
          console.log("> Subscription is not ready yet. \n\n");
        }
      });

     // Cursor
     instance.posts = function() { 
        return Posts.find({}, {sort: {createdAt: -1}, limit: instance.loaded.get()});
      }
};



Template.streamTemplate.rendered = function () {
    var $this = this
    var limit = $this.limit.get();
    limit += 5;
  $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
         $this.limit.set(limit);
      }
    });
};

Template.streamTemplate.helpers({
  // the posts cursor
  posts: function () {
    return Template.instance().posts();
  },
  // the subscription handle
  isReady: function () {
    return Template.instance().ready.get();
  },
  // are there more posts to show?
  hasMorePosts: function () {
    return Template.instance().posts().count() >= Template.instance().limit.get();
  }
});
