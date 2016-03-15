var dotenv = require('dotenv').config({silent: true})

module.exports = {
  'twitter': {
    'consumerKey': process.env.TWITTER_API_KEY,
    'consumerSecret': process.env.TWITTER_API_SECRET,
    'callbackURL': 'http://127.0.0.1:3000/auth/twitter/callback'
    // 'profileFields': ['emails', 'displayName']
  }
}
