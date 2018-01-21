var Bill = require('../models/outstanding');
var bcrypt = require('bcrypt');
var Menu = require('../models/menu');

module.exports = function(app){

    app.get('/show', function(req, res){
        res.render('billPreviews');
      });

      app.get('/outstanding', function(req, res) {
          res.render('outstanding', { title: 'DrinkEasy' });
      });

      app.get('/money-requests/send', function(req, res){
          res.render('billPreviews');
      });

  };
