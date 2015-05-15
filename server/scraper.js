Meteor.startup(function() {

  SyncedCron.add({
    name: 'Scrape data from eurorivals.net using iframe selector',
    schedule: function(parser) {
      // parser is a later.parse object
      // fires every 5 minutes
      // return parser.recur().on(40).minute();
         return parser.text(' every 6 hours');
    },
    job: function() {
        var videos = [];
        var videoTitles = [];
        var $ = cheerio.load(Meteor.http.get("http://eurorivals.net/football-highlights.html").content);
        var video_selecter = $(".singlevideo iframe");
        var title_selecter = $("table h2 a");
  
        $(video_selecter).each(function(index, value) {
            // url = value.attribs.src;
            
           /* if (Videos.findOne({url: url}) === null){
              Videos.insert({url: url});
            }
*/          videos[index] = value.attribs.src;

        });

        $(title_selecter).each(function(index, value) {
            videoTitles[index] = value.children[0].data;
            
        });

        for (var i = 0; i < videos.length; i++) {
          var url = videos[i];
          var title = videoTitles[i];
          var checkme = Videos.findOne({url: url});

          if (typeof(checkme) == "undefined"){
                      
            Videos.insert({url: url, title: title}, function (err, id) {
             if (err) {
               console.log(err);
             }
             else {
               console.log(id);
             }
            });
        };
      }


    
  }
  });

  SyncedCron.start();
});