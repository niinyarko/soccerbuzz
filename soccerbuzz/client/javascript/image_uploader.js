var uploader = new ReactiveVar();

Template.buzzModal.events({
    "change [data-action='image-upload']": function (event, template) {
        var upload = new Slingshot.Upload("soccerbuzz"),
              file = template.find("[data-action='image-upload']").files[0];
        if (file) {
            upload.send(file, function (error, downloadUrl) {
                uploader.set();

                if (error) {
                    alert(error.message);
                }
                else {
                    //TODO Call your method here
                    Session.set("imageUrl", downloadUrl);
                    // Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
                }
            });
        }

        uploader.set(upload);
    }
});

Template.progressBar.helpers({

    isUploading: function () {
        return Boolean(uploader.get());
    },

    progress: function () {
        var upload = uploader.get();
        if (upload)
            return Math.round(upload.progress() * 100);
    }
});


Template.myImage.helpers({
  url: function() {
    return Session.get("imageUrl");
  }
})
