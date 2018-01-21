var mongoose = require('mongoose');

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://drinkeasy:drinkeasy@ds263847.mlab.com:63847/drinkeasy');

//create User model
var userSchema = mongoose.Schema({
  nameOfBar: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
      type: String,
      required: true
  },
  setUpMenu: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
