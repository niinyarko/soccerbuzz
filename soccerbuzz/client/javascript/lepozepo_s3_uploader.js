window.URL = window.URL || window.webkitURL;

Template.s3Upload.events({
    "change .file_bag": function(event, template){
        var files = $("input.file_bag")[0].files
        var checkfile = template.find(".file_bag").files[0];
        if($.inArray(files[0].type, ["image/png", "image/jpeg", "image/gif", "image/jpg"]) == -1) {
            swal({   
                title: "Invalid File Type",   
                text: "Please upload an image",  
               });
        };
        if (checkfile) {
             img = new Image();
             img.src = window.URL.createObjectURL( checkfile );
             img.onload = function () {
               var width = img.naturalWidth,
                   height = img.naturalHeight;
             window.URL.revokeObjectURL( img.src );
             
             if( width >= 450 && height >= 300 ) {
                S3.upload({
                        files:files,
                        path:"images",
                        unique_name: false,
                         acl: "public-read"
                    },function(error, success){
                        if (error) {
                            swal('we are sorry, something went wrong');
                        }
                        else {
                            Session.set('fileExists', true);
                            Session.set('absoluteImageUrl', success.url);
                            Session.set('relativeImageUrl', success.relative_url);
                        }
                });
             }
             else {
                swal({   
                    title: "Image size is too small",   
                    text: "Image should be atleast 450x300",  
                   });
             }
         };
    };
    },
    "click [data-action='remove-image']": function() {
        var relative_url = this.relative_url;
        S3.delete(
            relative_url,
        function(error, success) {
            if (error) {
                console.log(error);
            }
            else {
                Session.set('fileExists', false)
                this.status = 'removed';
                reset_form_element( $('.file_bag') );
            }
        });
       
    }
})

Template.s3Upload.helpers({
    "files": function(){
        if (Session.get('fileExists')) {
          return S3.collection.find();
        };
    },
    'complete': function() {
        if (this.status == 'complete') {
            return true;
        };
    },
    'uploadNotStarted': function() {
        if (this.percent_uploaded == 'undefined' || null) {
            return true;
        };
    }
})

reset_form_element = function(e) {
    e.wrap('<form>').parent('form').trigger('reset');
    e.unwrap();
}