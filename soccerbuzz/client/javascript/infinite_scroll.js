/*  var ITEMS_INCREMENT = 20;
  Session.setDefault('itemsLimit', ITEMS_INCREMENT);
  Tracker.autorun(function() {
    Meteor.subscribe('allBuzzes', Session.get('itemsLimit'));
  });
 
  Template.home.buzz = function() {
    return Buzz.find();
  }
 */
 if(Meteor.isClient){
   Tracker.autorun(function() {
    handle = Meteor.subscribeWithPagination('allBuzzes', 20);
  });

  Template.home.buzz = function() {
    return Buzz.find({}, {sort: {createdAt: -1}});
  }
 }