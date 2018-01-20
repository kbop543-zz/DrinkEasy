var mongoose = require('mongoose');

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://drinkeasy:drinkeasy@ds263847.mlab.com:63847/drinkeasy');

var drinksSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    quantity:{
        type: Number,
        default: 1
    }
});

//create User model
var billSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  },
  barID: {
    type: String,
    required: true,
    unique: true
  },
  customerID: {
    type: String,
    required: true,
    unique: true
  },

  drinks: [drinksSchema]
});

module.exports = mongoose.model('Bill', userSchema);
