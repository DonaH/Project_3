var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema

var userSchema = new Schema({
  local: {
    name: {type: String, unique: true},
    email: String,
    password: String
  },
  twitter: {
    id: String,
    name: String,
    username: String,
    token: String
  }
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
