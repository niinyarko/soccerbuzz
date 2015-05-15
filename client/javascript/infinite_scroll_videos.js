Template.soccerHighlights.created = function () {
    // 1. Initialization

     var instance = this;

     // initialize the reactive variables
     instance.loaded = new ReactiveVar(0);
     instance.limit = new ReactiveVar(5);
     instance.ready = new ReactiveVar(false);

     instance.autorun(function () {

        // get the limit
        var limit = instance.limit.get();

        console.log("Asking for "+limit+" videos…")

        // subscribe to the posts publication
        var subscription = Meteor.subscribe('videos', limit);

        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
          console.log("> Received "+limit+" videos. \n\n")
          instance.loaded.set(limit);
          instance.ready.set(true);
        } else {
          instance.ready.set(false);
          console.log("> Subscription is not ready yet. \n\n");
        }
      });

     instance.videos = function() { 
        return Videos.find({}, {limit: instance.loaded.get()});
      }


};

Template.soccerHighlights.events({
  "click [data-action='load-btn']": function (event, instance) {
    event.preventDefault();

    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get();

    // increase limit by 5 and update it
    limit += 5;
    instance.limit.set(limit);
  }
});

Template.soccerHighlights.helpers({
  // the videos cursor
  videos: function () {
    return Template.instance().videos();
  },
  // the subscription handle
  isReady: function () {
    return Template.instance().ready.get();
  },
  // are there more videos to show?
  hasMoreVideos: function () {
    return Template.instance().videos().count() >= Template.instance().limit.get();
  }
});