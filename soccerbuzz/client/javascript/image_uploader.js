var uploader = new ReactiveVar();
window.URL = window.URL || window.webkitURL;

Template.buzzModal.events({
    "change [data-action='image-upload']": function (event, template) {
        var upload = new Slingshot.Upload("soccerbuzz"),
              file = template.find("[data-action='image-upload']").files[0];
        if (file) {
            var img = new Image();
            img.src = window.URL.createObjectURL( file );
            img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;

                    window.URL.revokeObjectURL( img.src );

                    if( width > 600 && height > 315 ) {
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
                    else {
                        swal({   
                            title: "Image size is too small",   
                            text: "Image should be atleast 600x315",  
                           });
                    }
                };
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
