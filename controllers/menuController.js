var User = require('../models/user');
var bcrypt = require('bcrypt');
var Menu = require('../models/menu');

//use for pages that require login
var requirelogin = function requirelogin(req, res, next){
    if(!req.user){
      res.render('index', {
        error: 'Please log in',
        partials: {
            content: 'login'
        }
   });
    }
    else{
      next();
    }
};

module.exports = function(app){

//middleware function for sessions
app.use(function(req, res, next){
    if(req.session && req.session.user){
      User.findOne({email: req.session.user.email}, function(err, user){
        if(user){
          req.user = user;
          delete req.user.password;
          req.session.user = user;
          res.locals.user = user;
        }
        next();
      });
    }
    else{
      next();
    }
    });

app.get('/dashboard', requirelogin, function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      if (!user){
         res.render('index', {error: 'Please log in'});
         console.log(user);
      }
      else{
        req.session.user = user;
        res.render('menu', {email: user.email, barname: user.nameofbar, password: user.password, address:user.address});
        console.log(user);
        }
      });
  });

    
};