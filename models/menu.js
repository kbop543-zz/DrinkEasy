var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
    drinkName:{
        type: String,
        unique: true,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    description:{
        type: String
    }
});

//create User model
var menuSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  drinks: [drinkSchema],

  keepTab: {
    type: Boolean,
    required: true
  },

  company: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Menu', menuSchema);
