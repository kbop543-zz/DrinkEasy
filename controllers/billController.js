var Bill = require('../models/outstanding');
// var bcrypt = require('bcrypt');
// var Menu = require('../models/menu');

module.exports = function(app){

    app.get('/outstandingbills', function(req, res){
        Bill.find({barID: req.body.barID}, function(err, user){
          if (!user){
             res.render('outstanding-bills', {error: 'None outstanding bills!'});
             console.log(user);
          }
          else{
            req.session.user = user;
            res.render('menu');
            console.log(user);
            }
          });
      });

  };
