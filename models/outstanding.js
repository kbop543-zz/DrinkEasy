var mongoose = require('mongoose');

var drinksSchema = mongoose.Schema({
    drinkName:{
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
var outstandingSchema = mongoose.Schema({
  barID: {
    type: String,
    required: true
  },
  customerID: {
    type: String,
    required: true,
    unique: true
  },

  drinks: [drinksSchema],

  ready : {
    type: Boolean,
    required: true,
    default: false
  },

  totalPrice : {
    type: Number
  }
});

module.exports = mongoose.model('Outstanding', outstandingSchema);
