Meteor.startup(function(){
    Tracker.autorun(function(){
      document.title = Session.get("DocumentTitle");
    });
})