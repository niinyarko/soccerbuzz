Template.buzzModal.events({
  "hidden.bs.modal #buzzModal": function(e,t) {
  // $("#buzzModal").find('#insertBuzzForm')[0].reset();
   $("#imageThumbnail img").attr("src", "");
   $('.img-thumbnail').hide();
   $("[data-action='remove-image']").hide();
   $("#insertBuzzForm").trigger('reset');
   // $( "#progressbar" ).progressbar( "destroy" );
   $(".progress").remove();
   // $('.submit-btn').removeAttr('disabled');
   $(".submit-btn").prop("disabled", false);


}
});
