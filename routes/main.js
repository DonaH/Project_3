var
  express = require('express'),
  mainRouter = express.Router(),
  mainController = require('../controllers/main.js')

mainRouter.get('/', mainController.index)

module.exports = mainRouter
