Router.configure({  
  layoutTemplate: 'masterLayout'
});

Router.route("/", function() {
    this.render("home");
},
{   name: "home",
     waitOn: function(){
      Tracker.autorun(function() {
      handle = Meteor.subscribeWithPagination('allBuzzes', 20);
      return handle;
      })
    },
    data: function() {
        GAnalytics.pageview();
        return {
          buzz: Buzz.find({}, {sort: {createdAt: -1}})
        }
    }
})

Router.route("/:_id/:slug", function() {
    this.render("showBuzzTemplate");
},
{   name: "showBuzz",
     waitOn: function(){
      return Meteor.subscribe("allBuzzes");
      },
      fastRender: true,
    data: function() {
        GAnalytics.pageview();
        var _id = this.params._id;
        return {
         buzz: Buzz.findOne(_id)
      }
    },
    onAfterAction: function() {
        var buzz;
        if (!Meteor.isClient) {
              return;
            }

        buzz = this.data().buzz;
        SEO.set({
               title: buzz.caption,
               meta: {
                 'description': buzz.caption
               },
               og: {
                 'title': buzz.caption,
                 'image': buzz.imageUrl,
                 'description': buzz.caption,
                 'site_name': 'soccabuzz'
               }
             });
    }
    
})