var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema


var profileSchema = new Schema({
  textInput: {type: String, required: true},
  twitterAuthor: {type: String},
  // _creator: {type: Schema.Types.ObjectId, ref: 'User'},
  //Category Big 5 Personality Traits
  big5personality: {
    openness: {type: Number},
    conscientiousness: {type: Number},
    extraversion: {type: Number},
    agreeableness: {type: Number},
    emotionalRange: {type: Number}
  },
  //Subcategories of Big 5 Personality trait "Openness"
  opennessBreakdown: {
    adventurousness: {type: Number},
    artisticInterests: {type: Number},
    emotionality: {type: Number},
    imagination: {type: Number},
    intellect: {type: Number},
    authorityChallenging: {type: Number}
  },
  //Subcategories of Big 5 Personality trait "Conscientiousness"
  conscientiousnessBreakdown: {
    achievementStriving: {type: Number},
    cautiousness: {type: Number},
    dutifulness: {type: Number},
    orderliness: {type: Number},
    selfDiscipline: {type: Number},
    selfEfficacy: {type: Number}
  },
  //Subcategories of Big 5 Personality trait "Extraversion"
  extraversionBreakdown: {
    activityLevel: {type: Number},
    assertiveness: {type: Number},
    cheerfulness: {type: Number},
    excitementSeeking: {type: Number},
    outgoing: {type: Number},
    gregariousness: {type: Number}
  },
  //Subcategories of Big 5 Personality trait "Agreeableness"
  agreeablenessBreakdown: {
    altruism: {type: Number},
    cooperation: {type: Number},
    modesty: {type: Number},
    uncompromising: {type: Number},
    sympathy: {type: Number},
    trust: {type: Number}
  },
  //Subcategories of Big 5 Personality trait "Emotional Range"
  emotionalRangeBreakdown: {
    fiery: {type: Number},
    proneToWorry: {type: Number},
    melancholy: {type: Number},
    immoderation: {type: Number},
    selfConsciousness: {type: Number},
    susceptibleToStress: {type: Number}
  },
  //Category Needs
  needs: {
    challenge: {type: Number},
    closeness: {type: Number},
    curiosity: {type: Number},
    excitement: {type: Number},
    harmony: {type: Number},
    ideal: {type: Number},
    liberty: {type: Number},
    love: {type: Number},
    practicality: {type: Number},
    selfExpression: {type: Number},
    stability: {type: Number},
    structure: {type: Number}
  },
  //Category Values
  values: {
    conservation: {type: Number},
    opennessToChange: {type: Number},
    hedonism: {type: Number},
    selfEnhancement: {type: Number},
    selfTranscendence: {type: Number}
  }

  })

var Profile = mongoose.model('Profile', profileSchema)

//****FOR TESTING: put the code below in the server.js file to seed a new profile in the database upon server start****//
// var newProfile = new Profile()
// newProfile.textInput = "hello"
// newProfile.twitterAuthor = "joetwitter"
// newProfile.big5personality.openness = 0.5
// newProfile.save(function(err){
//   if (err) throw err
//   console.log("Profile saved.")
// })

module.exports = Profile
