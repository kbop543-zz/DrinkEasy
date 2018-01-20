var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
    name:{
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
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  drinks: [drinkSchema]
});

module.exports = mongoose.model('Menu', menuSchema);