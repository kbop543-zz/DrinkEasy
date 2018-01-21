var mongoose = require('mongoose');

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

module.exports = mongoose.model('Bill', billSchema);
