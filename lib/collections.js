SimpleSchema.messages({
  maxString: "[label] cannot exceed [max] characters"
})

Signups = new Mongo.Collection("signups");

Signups.attachSchema(new SimpleSchema({
  email: {
   type: String,
   label: "Email Address",
   regEx: SimpleSchema.RegEx.Email 
  }
}))

Posts = new Mongo.Collection("posts");

Posts.attachSchema(new SimpleSchema({
  score: {
    type: Number,
    autoform: {
      omit: true
    }
  },
  upvoters: {
    type: [String],
    autoform: {
      omit: true
    }
  },
  downvoters: {
    type: [String],
    autoform: {
      omit: true
    }
  },
  caption: {
    type: String,
    max: 140,
    label: "Add a caption"
  },
  absoluteImageUrl: {
    type: String,
    label: "select file (Image should be at least 450x300)",
    autoform: {
      omit: true
    }
  },
  relativeImageUrl: {
    type: String,
    autoform: {
      omit: true
    }
  },
  owner: {
    type: String,
    autoform: {
      omit: true
    },
    autoValue: function() {
      if(this.isInsert) {
        return Meteor.userId();
      }
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    },
    autoValue: function() {
      if(this.isInsert) {
        return new Date();
      }
    }
  }
}))

Comments = new Mongo.Collection("comments");

Comments.attachSchema(new SimpleSchema({
  comment: {
    type: String
  },
  postId: {
    type: String,
    autoform: {
      omit: true
    }
  },
    likes: {
    type: Number,
     autoform: {
      omit: true
    }
  },
    dislikes: {
    type: Number,
     autoform: {
      omit: true
    }
  },
   owner: {
    type: String,
    autoform: {
      omit: true
    },
      autoValue: function(){
      if (this.isInsert){
        return Meteor.userId();
      }
    }
  },
   createdAt: {
    type: Date,
    autoform: {
      omit: true
    },
    autoValue: function(){
      if (this.isInsert){
        return new Date();
      }
    }
  }
}))


Replies = new Mongo.Collection("replies");

Replies.attachSchema(new SimpleSchema({
  reply: {
    type: String
  },
  commentId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  postId: {
    type: String,
    autoform: {
      omit: true
    }
  },
   likes: {
    type: Number,
     autoform: {
      omit: true
    }
  },
   dislikes: {
    type: Number,
     autoform: {
      omit: true
    }
  },
   owner: {
    type: String,
    autoform: {
      omit: true
    },
      autoValue: function(){
      if (this.isInsert){
        return Meteor.userId();
      }
    }
  },
   createdAt: {
    type: Date,
    autoform: {
      omit: true
    },
    autoValue: function(){
      if (this.isInsert){
        return new Date();
      }
    }
  }
}))


Posts.helpers({
  formatedCaption: function() {
    var caption = this.caption;
    return caption.replace(/\s+/g, '-').toLowerCase();
  }
});

AdminConfig = {
  nonAdminRedirectRoute: 'entrySignIn',
  collections: {
    Posts: {
      icon: 'camera',
      tableColumns: [
        {
          label: 'Title',
          name: 'caption'
        }, {
          label: 'Published',
          name: 'createdAt'
        }
      ],
    },
    Comments: {
            icon: 'comment',
            tableColumns: [
              {label: 'Content', name: 'comment'}
            ],
            showWidget: false
    },
    Signups: {
            icon: 'user',
            tableColumns: [
              {label: 'Email', name: 'email'}
            ]
    }
  }
}
/*Comments.helpers({
  comments: function () {
    var buzzId = this._id;
    return Comments.find({buzzId: buzzId});
  }
});*/

Comments.helpers({
  buzzTitle: function () {
    if (this.posts) {
      return Posts.findOne(this.posts).title;
    }
  }
})