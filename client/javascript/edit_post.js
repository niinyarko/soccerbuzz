Template.editPost.events({
  "hidden.bs.modal #editPostModal": function(e,t) {
    $("#editPostModal").find('#updatePostForm')[0].reset();
  }
});