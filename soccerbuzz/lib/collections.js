Signups = new Mongo.Collection("signups");

Signups.attachSchema(new SimpleSchema({
  email: {
   type: String,
   label: "Email Address",
   regEx: SimpleSchema.RegEx.Email 
  }
}))

Buzz = new Mongo.Collection("buzzes");

Buzz.attachSchema(new SimpleSchema({
  caption: {
    type: String,
    label: "Add a caption"
  },
    imageUrl: {
    type: String,
    label: "choose files",
    autoform: {
       afFieldInput: {
        type: "file",
        multiple: true,
        id: "image"
      }
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
  buzzId: {
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

Buzz.helpers({
  formatedCaption: function() {
    var caption = this.caption;
    return caption.replace(/\s+/g, '-').toLowerCase();
  }
});