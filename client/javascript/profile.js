Template.profile.events({
  "click .btn-delete": function (e) {
      var postId = e.currentTarget.getAttribute('data-id');
      var post = Posts.findOne(postId);
      sweetAlert({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      html: false
    }, function(){
      Meteor.call('removePost', postId, function (error, result) {
        if (error) {}
        else {
          S3.delete(
              post.relativeImageUrl,
          function(error, success) {
              if (error) {
                  console.log(error);
              };
          });
        }
      });
      swal("Deleted!",
      "this post has been deleted.",
      "success");
    });
},
"click .btn-upload-big": function() {
  $( "[data-action='new-buzz']" ).trigger( "click" );
},
"click [data-action='edit-post']": function(e,t) {
  var postId = e.currentTarget.getAttribute('data-id');
  var post = Posts.findOne(postId);
  var downvoters = post.downvoters;
  var upvoters = post.upvoters;
  var postScore = post.score;
  var postImageRelativeUrl = post.relativeImageUrl;
  var postImageAbsoluteUrl = post.absoluteImageUrl;
  Session.set('downvoters', downvoters);
  Session.set('upvoters', upvoters);
  Session.set('editPost', post);
  Session.set('absoluteUrl', postImageAbsoluteUrl);
  Session.set('relativeUrl', postImageRelativeUrl);
  Session.set('score', postScore);
  $('#editPostModal').modal('show');

},
"click .btn-remove": function(e,t) {
   var postId = e.currentTarget.getAttribute('data-id');
   var post = Posts.findOne(postId);
   var userId = Meteor.userId();
   Posts.update({ _id: postId }, { $pull: { upvoters:  userId } });
}
});

Template.profile.rendered = function () {
  $('.menu .item').tab();
};
 
