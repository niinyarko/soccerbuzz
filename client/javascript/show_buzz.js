
Template.showBuzzTemplate.events({
  "click [data-action='comments-toggle']": function() {
    $("#commentsShow").toggleClass("hide-comments");
    var txt =  $("#commentsShow").hasClass('') ? 'Hide Comments' : 'Show Comments'
    $(".btn-toggle").html("<p>" + txt + "</p>");  
  },
  "click [data-action='add-comment']": function() {
    if(!Meteor.user()) {
    swal("Sorry! you need to signin to comment");
  }
  },
    "click [ data-action='upvote']": function(e) {
      if (!Meteor.user()) {$("#popLogin").modal("show")};
      var postId = this.post._id;
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
      var postId = this.post._id;
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

Template.showBuzzTemplate.rendered = function () {
  try {
      FB.XFBML.parse();
  }catch(e) {} 
};