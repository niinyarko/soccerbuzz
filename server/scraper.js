Meteor.startup(function() {

  SyncedCron.add({
    name: 'Scrape data from eurorivals.net using iframe selector',
    schedule: function(parser) {
      // parser is a later.parse object
      // fires every 5 minutes
      // return parser.recur().on(40).minute();
         return parser.text(' every 56 minute');
    },
    job: function() {
        var videos = [];
        var videoTitles = [];
        var $ = cheerio.load(Meteor.http.get("http://eurorivals.net/football-highlights.html").content);
        var video_selecter = $(".singlevideo iframe");
        var title_selecter = $("table h2 a");
  
        $(video_selecter).each(function(index, value) {
         videos[index] = value.attribs.src;

        });

        $(title_selecter).each(function(index, value) {
            videoTitles[index] = value.children[0].data;
            
        });

        for (var i = 0; i < videos.length; i++) {
          var url = videos[i];
          // var mainUrl = videos[i];
          // s = mainUrl.substring(0, mainUrl.indexOf('?'));
          // var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
         /* var r = mainUrl.match(rx);
          var res = r[1]
          posterUrl = s + "?autoplay=0&showinfo=0&controls=0"
          var posterUrl =  "http://img.youtube.com/vi/" + res + "/0.jpg";*/
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