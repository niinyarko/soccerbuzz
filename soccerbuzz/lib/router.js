Router.configure({  
  layoutTemplate: 'masterLayout',
   notFoundTemplate: '404',
   loadingTemplate: 'loading'
});

/*Router.route("/", function() {
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
})*/

/*Router.route('/', {
  // this template will be rendered until the subscriptions are ready
  name: 'home',
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
     Tracker.autorun(function() {
      handle = Meteor.subscribeWithPagination('posts', 1);
      return handle;
    });
  },

  action: function () {
    this.render('home');
  },
  data: function() {
      GAnalytics.pageview();
      return {
        posts: Posts.find({}, {sort: {createdAt: -1}})
      }
  }
});*/

Router.route("/", function() {
    this.render("home");
},
{   name: "home"
})

Router.route("/image/:_id/:slug", function() {
    this.render("showBuzzTemplate");
},
{   name: "showBuzz",
     waitOn: function(){
      return Meteor.subscribe("posts");
      },
    data: function() {
        GAnalytics.pageview();
        var _id = this.params._id;
        return {
         post: Posts.findOne(_id)
      }
    },
    onAfterAction: function() {
        var post;
        if (!Meteor.isClient) {
              return;
            }

        post = this.data().post;
        SEO.set({
               title: post.caption,
               meta: {
                 'description': post.caption
               },
               og: {
                 'title': post.caption,
                 'image': post.imageUrl,
                 'description': post.caption,
                 'site_name': 'soccabuzz',
                 'type': 'article'
               }
             });
    }
    
})


Router.route('/reset-password/:token', function() {
  this.render('ResetPassword');
},
  { name: 'resetPwd',
  onAfterAction: function() {
    var token = Router.current().params.token;
    Session.set('resetPassword', token);
  }
});


/*Router.route('/image/:_id/:slug', function(){
  this.render("showBuzzTemplate");
},
  { name: 'showBuzz',
    waitOn: function(){
      return Meteor.subscribe("allBuzzes");
      },
    data: function() {
        GAnalytics.pageview();
        var _id = this.params._id;
        return {
         buzz: Buzz.findOne(_id)
      }
    },
      seo: {
        title: function() {
          return this.data().buzz.caption;
        },
        meta: {
          keywords: ['soccer', 'soccer funny images', 'soccer images', 'football', 'football images', 'football funny images']
        },
        description: function() {
          return this.data().buzz.caption;
        },
        image: function() {
          return this.data().buzz.imageUrl;
        },
        type: 'article'
      }
})*/