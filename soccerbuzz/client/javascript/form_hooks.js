  AutoForm.hooks({
  insertBuzzForm: {
     formToDoc: function(doc, ss, formId) {
        doc.score = 0;
        return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
    Buzz.insert({
      score: insertDoc.score,
      caption: insertDoc.caption,
      imageUrl: Session.get("imageUrl")
    }, function(err, id) {
       if (err) {
          this.done();
        }
        else {
          $("#buzzModal").modal("hide");
          swal("Thanks! your image has been posted");
        }
    })
       return false;  
    }
  }
});

AutoForm.hooks({
  insertCommentForm: {
    formToDoc: function(doc, ss, formId) {
        doc.buzzId = Router.current().params._id;
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
        doc.buzzId = Router.current().params._id;
        return doc;
        doc.likes = 0;
    },

     onSuccess: function(operation, result, template) {
      $("#replies-box").hide();
       swal("Thanks! your reply has been recorded");
    }
  }
})

