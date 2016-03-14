// SETUP

var
express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
logger = require('morgan'),
app = express()

// DATABASE

mongoose.connect('mongodb://localhost/project-3', function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB (project-3)")
})

// MIDDLEWARE

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ROUTES

app.get('/', function(req, res){
  res.send("Home")
})

// SERVER

app.listen(3000, function() {
  console.log("Server running on port 3000.")
})
