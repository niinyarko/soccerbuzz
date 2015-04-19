  AutoForm.hooks({
  insertBuzzForm: {
     formToDoc: function(doc, ss, formId) {
        doc.score = 0;
        doc.upvoters = ['first'];
        doc.downvoters = ['first'];
        doc.relativeImageUrl = Session.get('relativeImageUrl');
        doc.absoluteImageUrl = Session.get('absoluteImageUrl');
        return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      Meteor.call('insertPost', insertDoc, function (error, result) {
        if (error) {
          this.done();
        }
        else {
          $("#buzzModal").modal("hide");
          swal("Thanks! your image has been posted");
        }
      });
       return false;  
  }
}
});

AutoForm.hooks({
  updatePostForm: {
     formToDoc: function(doc, ss, formId) {
        doc.downvoters = Session.get('downvoters');
        doc.upvoters = Session.get('upvoters');
        doc.score = Session.get('score');
        doc.relativeImageUrl = Session.get('relativeUrl');
        doc.absoluteImageUrl = Session.get('absoluteUrl');
        return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('updatePost', currentDoc._id, updateDoc, function (error, result) {
          if (error) {
            this.done();
          }
          else {
            swal("Post successfully updated");
            $('#editPostModal').modal('hide');
          }
        });
       return false; 
    }
  }
})

AutoForm.hooks({
  insertCommentForm: {
    formToDoc: function(doc, ss, formId) {
        doc.postId = Router.current().params._id;
        doc.likes = 0;
        doc.dislikes= 0;
        return doc;
    },

     onSuccess: function(operation, result, template) {
       swal("Thanks! your comment has been recorded");
    }
  }
});

AutoForm.addHooks(null, {
    onError: function (operation, error, template) {
      console.log('Error: ' + error);
    }
  });


AutoForm.hooks({
  insertEmailForm: {
    onSuccess: function(operation, result, template) {
       swal("Thanks for signing up for the free newsletter from soccabuzz!!!");
    }
  }
});


AutoForm.hooks({
  insertReplyForm: {
    formToDoc: function(doc, ss, formId) {
        doc.commentId = Session.get("commentId");
        doc.postId = Router.current().params._id;
        return doc;
        doc.likes = 0;
    },

     onSuccess: function(operation, result, template) {
      $("#replies-box").hide();
       swal("Thanks! your reply has been recorded");
    }
  }
})

