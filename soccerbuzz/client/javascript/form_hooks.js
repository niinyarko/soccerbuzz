  AutoForm.hooks({
  insertBuzzForm: {
     formToDoc: function(doc, ss, formId) {
        doc.score = 0;
        doc.upvoters = ['first'];
        doc.relativeImageUrl = Session.get('relativeImageUrl');
        doc.absoluteImageUrl = Session.get('absoluteImageUrl');
        return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    Posts.insert({
      upvoters: insertDoc.upvoters,
      score: insertDoc.score,
      caption: insertDoc.caption,
      relativeImageUrl: insertDoc.relativeImageUrl,
      absoluteImageUrl: insertDoc.absoluteImageUrl
    }, function(err, id) {
       if (err) {
          this.done();
        }
        else {
          $("#buzzModal").modal("hide");
          swal("Thanks! your image has been posted");
         /* $("button.confirm").on("click", function(){
            location.reload();
          })*/
        }
    })
       return false;  
    }
  }
});

AutoForm.hooks({
  updatePostForm: {
     formToDoc: function(doc, ss, formId) {
        doc.upvoters = Session.get('upvoters');
        doc.score = Session.get('score');
        doc.relativeImageUrl = Session.get('relativeUrl');
        doc.absoluteImageUrl = Session.get('absoluteUrl');
        return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Posts.update({_id: currentDoc._id}, updateDoc, function(err, id) {
          if(err) {
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
       swal("Thanks for signing up to the free newsletter from soccabuzz!!!");
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

