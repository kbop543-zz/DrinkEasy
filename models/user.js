var mongoose = require('mongoose');

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://drinkeasy:drinkeasy@ds263847.mlab.com:63847/drinkeasy');

//create User model
var userSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
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
  address1: {
      type: String,
      required: true
  },
  address2: {
      type: String
  },
  city: {
      type: String,
      required: true
  },
  state: {
      type: String,
      required: true
  },
  post: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('User', userSchema);
