Template.home.events({
  "click [data-action='showImage']": function(e,t) {
    var imageId = e.currentTarget.id;
    Session.set("imageId", imageId);
    $("#imageOverlay").show();
  },
  "click [data-action='cta-upload-btn']": function() {
    if(!Meteor.user()) {
      $("#popLogin").modal("show")
    }
    else {
       $("#buzzModal").modal("show");
    }
   
  }
  /*"click [data-action='load-btn']": function() {
    handle.loadNextPage();
  }*/,
  "click [ data-action='upvote']": function(e) {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var postId = this._id;
    var userId = Meteor.userId();
    var post = Posts.findOne(postId);

    if (!post) {
      throw new Meteor.Error('invalid', 'Post not found');
    }
    if (_.include(post.upvoters, userId)) {
      $("[ data-action='upvote']").toggleClass("hasVoted");
      if ($("[ data-action='upvote']").hasClass("hasVoted")){
        Meteor.call('downvote', postId, userId, function(error, result) {
          if(error) {
            console.log(error);
          }
          else {
            console.log(result);
          }
        });
      }
      else {
       Meteor.call('upvote', postId, userId, function(error, result) {
         if(error) {
           console.log(error);
         }
         else {
           console.log(result);
         }
       });
      }
    }
    else { 
      Meteor.call('upvote', postId, userId, function(error, result) {
        if(error) {
          console.log(error);
        }
        else {
          console.log(result);
        }
      });
    }
},
  "click [ data-action='downvote']": function() {
    if (!Meteor.user()) {$("#popLogin").modal("show")};
    var postId = this._id;
    var userId = Meteor.userId();
    var post = Posts.findOne(postId);
    if (!post) {
      throw new Meteor.Error('invalid', 'Post not found');
    }
    if (_.include(post.downvoters, userId)) {
      $("[ data-action='downvote']").toggleClass("hasVoted");
      if ($("[ data-action='downvote']").hasClass("hasVoted")){
        Meteor.call('downvote', postId, userId, function(error, result){
          if(error) {
            console.log(error);
          }
          else {
            console.log(result);
          }
        });
      }
      else {
        Meteor.call('upvote', postId, userId, function(error, result){
          if(error) {
            console.log(error);
          }
          else {
            console.log(result);
          }
        });
      }
    }
    else { 
        Meteor.call('downvote', postId, userId, function(error, result){
          if(error) {
            console.log(error);
          }
          else {
            console.log(result);
          }
        });
    }
}

})


Template.streamTemplate.events({
  "click [data-action='load-btn']": function(event, instance) {
      event.preventDefault();

          // get current value for limit, i.e. how many posts are currently displayed
          var limit = instance.limit.get();

          // increase limit by 5 and update it
          limit += 5;
          instance.limit.set(limit);
  },

});

Template.home.rendered = function () {
  try {
      FB.XFBML.parse();
  }catch(e) {}
};