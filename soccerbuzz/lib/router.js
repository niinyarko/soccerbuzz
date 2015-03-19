Router.configure({  
  layoutTemplate: 'masterLayout'
});

Router.route("/", function() {
    this.render("home");
},
{   name: "home",
    waitOn: function(){
      return [
        Meteor.subscribe("allBuzzes")
      ]
      
      },
    data: function() {
        GAnalytics.pageview();
        return {
            buzz: Pages.find({}, {sort: {createdAt: -1}, itemsPerPage:10})
        }
    }
})

Router.route("/profile", function() {
    this.render("profile");
},
{   name: "profile"
})

Router.route("/:_id/:slug", function() {
    this.render("showBuzzTemplate");
},
{   name: "showBuzz",
     waitOn: function(){
      return Meteor.subscribe("allBuzzes");
      },
    data: function() {
        var _id = this.params._id;
        return Buzz.findOne(_id);
    },
    onAfterAction: function() {
        var buzz = this.data();
        SEO.set({
        title: buzz.caption,
        meta: {
          'description': buzz.caption
        },
        og: {
          'title': buzz.caption,
          'image': buzz.imageUrl
        }
      });
    }
    
})