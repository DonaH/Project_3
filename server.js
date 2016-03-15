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
  passportConfig = require('./config/passport.js'),
  dotenv = require('dotenv').config({silent: true}),
  favicon = require('serve-favicon'),
  watson = require('watson-developer-cloud'),
  Profile = require('./models/Profile.js'),
  mainRoutes = require('./routes/main.js'),
  userRoutes = require('./routes/users.js'),
  apiRoutes = require('./routes/api.js'),
  app = express()

// ENVIRONMENT PORT
var port = process.env.PORT || 3000

// DATABASE
var dbURL = 'mongodb://localhost/project-3'
// dbURL for mLab MongoDB--  mongodb://<dbuser>:<dbpassword>@ds063134.mlab.com:63134/heroku_v7560t60
mongoose.connect(dbURL, function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB: " + dbURL)
})

// CONFIGURE EJS VIEW
app.set('view engine', 'ejs')

// MIDDLEWARE

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  secret: "boomboom",
  cookie: {_expires: 6000000}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(ejsLayouts)

// ROUTES

app.use('/', mainRoutes)

app.use('/', userRoutes)

app.use('/api', apiRoutes)


// SERVER

app.listen(port, function() {
  console.log("Server running on port ", port)
})
