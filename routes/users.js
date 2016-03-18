//user routes

var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router(),
  User = require('../models/User.js')


// Route for logging in
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/analyses',
    failureRedirect: '/login'
  }))

// Route for signing up
userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/analyses',
    failureRedirect: '/signup'
  }))

// Route for profile
userRouter.get('/profile', isLoggedIn, function(req, res){
  res.render('profile', {user: req.user})
})

// Route for profile
userRouter.get('/update', isLoggedIn, function(req, res){
  res.render('update', {user: req.user})
})

// Route for updating Profile
userRouter.patch('/profile/:id', function(req,res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err,user){
    if(err) console.log(err)
    res.json({success:"booyah!", user: user})
    console.log(user)
  })
})

// Route for deleting Profile
userRouter.delete('/profile/:id', function(req,res){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      console.log(err)
      res.json({success:false, message:"Not deleted"})
    } else {
      res.json({success:"", message:"Deleted."})
    }
  })
})

//function for checking if a user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.render('login', {message: "Please login to view your profile"})
}

// Route for logging out
userRouter.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

// Routes for logging in and out with Twitter

userRouter.get('/auth/twitter', passport.authenticate('twitter'))

userRouter.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/analyses',
  failureRedirect: '/login'
}))

module.exports = userRouter
