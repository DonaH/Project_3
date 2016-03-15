var
  express = require('express'),
  api = express.Router(),
  request = require('request'),
  ///
  OAuth2 = require('oauth').OAuth2,
  https = require('https'),
  Profile = require('../models/Profile.js'),
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


//WATSON TESTING BEGIN//
// var my_profile = "Call me Ishmael. Some years ago-never mind how long precisely-having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off-then, I account it high time to get to sea as soon as I can.";
//
// api.get('/watsonjson', function(req, res){
//   // console.log("Triggered Waton API route.")
//   // console.log(req.body.text)
//   personality_insights.profile({ text: my_profile },
//   function (err, profile) {
//     if (err) throw err
//     res.json(profile)
//   });
// })
//WATSON TESTING END//

api.post('/watson', function(req, res){
  // console.log("Triggered Waton API route.")
  // console.log(req.body.text)
  personality_insights.profile({ text: req.body.text },
  function (err, profile) {
    if (err) throw err
    var newProfile = new Profile()
    //saving text input
    newProfile.textInput = req.body.text
    //saving big 5 personality trait data
    newProfile.big5personality.openness = profile.tree.children[0].children[0].children[0].percentage
    newProfile.big5personality.conscientiousness = profile.tree.children[0].children[0].children[1].percentage
    newProfile.big5personality.extraversion = profile.tree.children[0].children[0].children[2].percentage
    newProfile.big5personality.agreeableness = profile.tree.children[0].children[0].children[3].percentage
    newProfile.big5personality.emotionalRange = profile.tree.children[0].children[0].children[4].percentage
    //big 5 subcategory openness
    newProfile.opennessBreakdown.adventurousness = profile.tree.children[0].children[0].children[0].children[0].percentage
    newProfile.opennessBreakdown.artisticInterests = profile.tree.children[0].children[0].children[0].children[1].percentage
    newProfile.opennessBreakdown.emotionality = profile.tree.children[0].children[0].children[0].children[2].percentage
    newProfile.opennessBreakdown.imagination = profile.tree.children[0].children[0].children[0].children[3].percentage
    newProfile.opennessBreakdown.intellect = profile.tree.children[0].children[0].children[0].children[4].percentage
    newProfile.opennessBreakdown.authorityChallenging = profile.tree.children[0].children[0].children[0].children[5].percentage
    //big 5 subcategory conscientiousness
    newProfile.conscientiousnessBreakdown.achievementStriving = profile.tree.children[0].children[0].children[1].children[0].percentage
    newProfile.conscientiousnessBreakdown.cautiousness = profile.tree.children[0].children[0].children[1].children[1].percentage
    newProfile.conscientiousnessBreakdown.dutifulness = profile.tree.children[0].children[0].children[1].children[2].percentage
    newProfile.conscientiousnessBreakdown.orderliness = profile.tree.children[0].children[0].children[1].children[3].percentage
    newProfile.conscientiousnessBreakdown.selfDiscipline = profile.tree.children[0].children[0].children[1].children[4].percentage
    newProfile.conscientiousnessBreakdown.selfEfficacy = profile.tree.children[0].children[0].children[1].children[5].percentage
    //big 5 subcategory extraversion
    newProfile.extraversionBreakdown.activityLevel = profile.tree.children[0].children[0].children[2].children[0].percentage
    newProfile.extraversionBreakdown.assertiveness = profile.tree.children[0].children[0].children[2].children[1].percentage
    newProfile.extraversionBreakdown.cheerfulness = profile.tree.children[0].children[0].children[2].children[2].percentage
    newProfile.extraversionBreakdown.excitementSeeking = profile.tree.children[0].children[0].children[2].children[3].percentage
    newProfile.extraversionBreakdown.outgoing = profile.tree.children[0].children[0].children[2].children[4].percentage
    newProfile.extraversionBreakdown.gregariousness = profile.tree.children[0].children[0].children[2].children[5].percentage
    //big 5 subcategory agreeableness
    newProfile.agreeablenessBreakdown.altruism = profile.tree.children[0].children[0].children[3].children[0].percentage
    newProfile.agreeablenessBreakdown.cooperation = profile.tree.children[0].children[0].children[3].children[1].percentage
    newProfile.agreeablenessBreakdown.modesty = profile.tree.children[0].children[0].children[3].children[2].percentage
    newProfile.agreeablenessBreakdown.uncompromising = profile.tree.children[0].children[0].children[3].children[3].percentage
    newProfile.agreeablenessBreakdown.sympathy = profile.tree.children[0].children[0].children[3].children[4].percentage
    newProfile.agreeablenessBreakdown.trust = profile.tree.children[0].children[0].children[3].children[5].percentage
    //big 5 subcategory emotional range
    newProfile.emotionalRangeBreakdown.fiery = profile.tree.children[0].children[0].children[4].children[0].percentage
    newProfile.emotionalRangeBreakdown.proneToWorry = profile.tree.children[0].children[0].children[4].children[1].percentage
    newProfile.emotionalRangeBreakdown.melancholy = profile.tree.children[0].children[0].children[4].children[2].percentage
    newProfile.emotionalRangeBreakdown.immoderation = profile.tree.children[0].children[0].children[4].children[3].percentage
    newProfile.emotionalRangeBreakdown.selfConsciousness = profile.tree.children[0].children[0].children[4].children[4].percentage
    newProfile.emotionalRangeBreakdown.susceptibleToStress = profile.tree.children[0].children[0].children[4].children[5].percentage
    //category needs
    newProfile.needs.challenge = profile.tree.children[1].children[0].children[0].percentage
    newProfile.needs.closeness = profile.tree.children[1].children[0].children[1].percentage
    newProfile.needs.curiosity = profile.tree.children[1].children[0].children[2].percentage
    newProfile.needs.excitement = profile.tree.children[1].children[0].children[3].percentage
    newProfile.needs.harmony = profile.tree.children[1].children[0].children[4].percentage
    newProfile.needs.ideal = profile.tree.children[1].children[0].children[5].percentage
    newProfile.needs.liberty = profile.tree.children[1].children[0].children[6].percentage
    newProfile.needs.love = profile.tree.children[1].children[0].children[7].percentage
    newProfile.needs.practicality = profile.tree.children[1].children[0].children[8].percentage
    newProfile.needs.selfExpression = profile.tree.children[1].children[0].children[9].percentage
    newProfile.needs.stability = profile.tree.children[1].children[0].children[10].percentage
    newProfile.needs.structure = profile.tree.children[1].children[0].children[11].percentage
    //category values
    newProfile.values.conservation = profile.tree.children[2].children[0].children[0].percentage
    newProfile.values.opennessToChange = profile.tree.children[2].children[0].children[1].percentage
    newProfile.values.hedonism = profile.tree.children[2].children[0].children[2].percentage
    newProfile.values.selfEnhancement = profile.tree.children[2].children[0].children[3].percentage
    newProfile.values.selfTranscendence = profile.tree.children[2].children[0].children[4].percentage
    //saving profile data object to database
    newProfile.save(function(err){
      if (err) throw err
      console.log("Profile saved.")
    })
    res.json(profile)
  });
})

// var newProfile = new Profile()
// newProfile.textInput = "hello"
// newProfile.twitterAuthor = "joetwitter"
// newProfile.big5personality.openness = 0.5
// newProfile.save(function(err){
//   if (err) throw err
//   console.log("Profile saved.")
// })

//************* END WATSON API *****************************//


module.exports = api
