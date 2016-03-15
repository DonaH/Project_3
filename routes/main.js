var
  express = require('express'),
  mainRouter = express.Router(),
  mainController = require('../controllers/main.js')

mainRouter.get('/', mainController.index)

mainRouter.get('/analyses', mainController.analyses)

module.exports = mainRouter
