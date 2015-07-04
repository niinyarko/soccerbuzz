Router.configure({  
  layoutTemplate: 'masterLayout',
   notFoundTemplate: '404',
   loadingTemplate: 'loading'
});


Router.route(':_id/my_profile', function() {
  this.render('profile');
},
{ name: 'profile',
  waitOn: function() {
    return Meteor.subscribe('posts', 0);
  },
  data: function() {
      Session.set("DocumentTitle", "My Soccabuzz Profile");
    var _id = this.params._id;
    var userId = Meteor.userId();
    return {
      posts: myPagination.find({owner: _id}, { itemsPerPage: 1, sort: {createdAt: -1} }),
      postsCount: Posts.find({owner: _id}).count(),
      postsUpvoted: myPagination.find({upvoters: userId}, { itemsPerPage: 1}),
      upvotesCount: Posts.find({upvoters: userId}).count()
    }

  }
})

Router.route('/single-video/:_id', function(){
  this.render('singleVideo');
},
{ name: 'singleVideo',
  waitOn: function() {
    var _id = this.params._id
    return Meteor.subscribe("singleVideo", _id);
  },
  data: function(){
    var _id = this.params._id;
    return {
      video: Videos.findOne(_id)
    }
  }
})

Router.route("/livescores", function(){
  this.render('livescores');
},
{ name: 'livescores'
})

Router.route(":_id/user/profile", function() {
  this.render("publicProfile");
}, {
    name: "public_profile",
    waitOn: function() {
      return Meteor.subscribe('posts', 0);
    },
    data: function() {
      Session.set("DocumentTitle", "User Profile");
      var _id = this.params._id;

      return {
        posts: myPagination.find({owner: _id}, { itemsPerPage: 5, sort: {createdAt: -1} }),
        postsCount: Posts.find({owner: _id}).count(),
        userId: _id

      }
    }
})

/*Router.route("/", function() {
    this.render("home");
    GAnalytics.pageview();
},
{   name: "home",
    data: function() {
      Session.set("DocumentTitle", "Soccabuzz - Welcome to Soccabuzz");
    }
});*/

Router.route("/", function() {
  this.render('soccerHighlights');
  GAnalytics.pageview();

}, {  name: "soccerHighlights",
    data: function() {
      // Session.set("DocumentTitle", "Soccer Highlights");
      Session.set("DocumentTitle", "Soccabuzz - Welcome to Soccabuzz");
    }
});




Router.route("/image/:_id/:slug", function() {
    this.render("showBuzzTemplate");
     GAnalytics.pageview();
},
{   name: "showBuzz",
     waitOn: function(){
      return Meteor.subscribe("posts", 0);
      },
    data: function() {
      Session.set("DocumentTitle", "Soccabuzz");
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
                 'image': post.absoluteImageUrl,
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
    Session.set("DocumentTitle", "Soccabuzz");
  }
});
