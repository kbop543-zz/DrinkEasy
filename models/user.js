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
  nameofbar: {
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
  }
});

module.exports = mongoose.model('User', userSchema);
