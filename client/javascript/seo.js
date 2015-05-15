Meteor.startup(function() {
      return SEO.config({
        title: 'SoccaBuzz - Welcome to SoccaBuzz',
        meta: {
          'description': 'Soccabuzz helps you create, discover and share soccer related content like images and soccer highlights'
        },
        og: {
          'image': '/Soccabuzz.png' 
        }
      });
});


/*SeoCollection.update(
    {
        route_name: 'soccerHighlights'
    },
    {
        $set: {
            route_name: 'soccerHighlights',
            title: 'Soccer Highlights',
            meta: {
                'description': 'Watch soccer highlights of your favourite soccer teams around the world'
            },
            og: {
                'title': 'Soccer Highlights'
            }
        }
    },
    {
        upsert: true
    }
);*/