Template.navbar.events({
   "click [data-action='signin-btn-small']": function() {
        $("#loginModal").modal("show");
    },
    "click [data-action='signin-btn']": function() {
        $("nav").removeClass("navbar-fixed-top");
        $("#overlay").show();
    },
    "click [data-action='signout-btn']": function() {
    Meteor.logout(function() {
      // Redirect to login
      Router.go('home');
    });
  },
    "click [data-action='new-buzz']": function() {
    $("#buzzModal").modal("show");
  },
  "click [data-action='overlay-close']": function() {
        $("nav").addClass("navbar-fixed-top");
        $("#overlay").hide();
    }
})