
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
  }
})


Template.showBuzzTemplate.rendered = function () {
  try {
      FB.XFBML.parse();
  }catch(e) {} 
};