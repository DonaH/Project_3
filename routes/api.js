var
  express = require('express'),
  api = express.Router(),
  request = require('request'),
  ///
  OAuth2 = require('oauth').OAuth2,
  https = require('https'),
  watson = require('watson-developer-cloud'),
  personality_insights = watson.personality_insights({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version: 'v2'
  });

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

//************* BEGIN WATSON API *****************************//

// var my_profile = "Call me Ishmael. Some years ago-never mind how long precisely-having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off-then, I account it high time to get to sea as soon as I can.";

api.post('/watson', function(req, res){
  // console.log("Triggered Waton API route.")
  // console.log(req.body.text)
  personality_insights.profile({ text: req.body.text },
  function (err, profile) {
    if (err) throw err
    res.json(profile)
  });
})

//************* END WATSON API *****************************//


module.exports = api
