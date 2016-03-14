//user routes

var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router()

// Route for logging in
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }))

// Route for signing up
userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-singup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

// Route for profile
userRouter.get('/profile', isLoggedIn, function(req, res){
  res.render('profile', {user: req.user})
})

//function for checking if a user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

// Route for logging out
userRouter.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

// Routes for logging in and out with Twitter

// userRouter.get('/auth/twitter', passport.authenticate('twitter', {
//   scope: ['email']
// }))

// userRouter.get('/auth/twitter/callback', passport.authenticate('twitter'), {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// })

module.exports = userRouter
