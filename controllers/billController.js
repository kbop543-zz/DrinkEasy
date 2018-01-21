var Outstanding = require('../models/outstanding');
var bcrypt = require('bcrypt');
var Menu = require('../models/menu');

module.exports = function(app){

  app.get('/outstanding', function(req,res){
    Menu.findOne({email: req.session.user.email}, function(err, menu){
      Outstanding.find({},function(err,allBills){
        console.log(allBills);
        console.log(req.session.user.email);
        console.log(menu);
        if (!menu){
          res.render('billPreviews',
          {email: req.user.email,
             barname: req.user.nameOfBar,
              password: req.user.password,
               address:req.user.address,
             alreadySetUp: false,
           allBills: allBills});
           }else{
             res.render('billPreviews',
             {email: req.user.email,
                barname: req.user.nameOfBar,
                 password: req.user.password,
                  address:req.user.address,
                alreadySetUp: true,
              allBills: allBills});
           }
         });
       })
  })

      app.get('/money-requests/send', function(req, res){
          res.render('billPreviews');
      });

  };
