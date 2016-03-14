// SETUP

var
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  mainRoutes = require('./routes/main.js')
  app = express()

// ENVIRONMENT PORT
var port = process.env.PORT || 3000

// DATABASE

mongoose.connect('mongodb://localhost/project-3', function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB (project-3)")
})

// CONFIGURE EJS VIEW
app.set('view engine', 'ejs')

// MIDDLEWARE

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(ejsLayouts)

// ROUTES

app.use('/', mainRoutes)

// SERVER

app.listen(port, function() {
  console.log("Server running on port ", port)
})
