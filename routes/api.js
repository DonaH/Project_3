var
  express = require('express'),
  api = express.Router(),
  request = require('request'),
  ///
  OAuth2 = require('OAuth').OAuth2,
  https = require('https')

//************* BEGIN TWITTER API *****************************//

var oauth2 = new OAuth2(process.env.TWITTER_API_KEY, process.env.TWITTER_API_SECRET, 'https://api.twitter.com/', null, 'oauth2/token', null);



api.get('/twitter/:id', function(req, res){
  console.log("Triggered Twitter API route")
  oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
  }, function(err, access_token){
    if(err) throw err
    console.log(access_token); //string that we can use to authenticate request
    var options = {
      hostname: 'api.twitter.com',
      path: '/1.1/statuses/user_timeline.json?screen_name=' + req.params.id + '&count=200',
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    };
    https.get(options, function(result){
      var buffer = '';
      result.setEncoding('utf8');
      result.on('data', function(data){
        buffer += data;
      });
      result.on('end', function(){
        var tweets = JSON.parse(buffer);
        console.log(tweets);
        res.json(tweets)
      });
    });
  });

})

//************* END TWITTER API *****************************//



// //shows 1 image from search
// api.get('/giphy/:search/single', function(req, res){
//   var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + req.params.search + "&api_key=dc6zaTOxFJmzC"
//   console.log("Request for a gif based on search: " + req.params.search)
//   request({url: giphyUrl, json:true}, function(error, response, body){
//     console.log("Sending...")
//     res.send('<img src="' + body.data[0].images.fixed_height.url + '">')
//   })
// })




module.exports = api
