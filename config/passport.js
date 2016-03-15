var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  // TwitterStrategy = require('passport-twitter').Strategy,
  User = require('../models/User.js')
  // , configAuth = require('./auth.js')

//USER OBJECT INTO COOKIE
passport.serializeUser(function(user, done){
  done(null, user.id)
})

//COOKIE INTO USER OBJECT
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

//LOCAL STRATEGY (CREATING USERS)
passport.use('local-signup', new LocalStrategy({
  //MAP EMAIL AND PASSWORD TO PASSPORT'S DEFAULT KEYS
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  //CHECK IF THERE IS AN EXISTING USER WITH THAT INFO
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    if(user) return done(null, false, req.flash('signupMessage', 'That Email is taken.'))
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    newUser.save(function(err){
      if(err) return console.log(err)
      return done(null, newUser, null)
    })
  })
}))

//LOCAL STRATEGY FOR LOGGING IN
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password.'))
    return done(null, user)
  })
}))

//TWITTER STRATEGY

module.exports = passport
