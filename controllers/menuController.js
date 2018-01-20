var User = require('../models/user');
var bcrypt = require('bcrypt');
var Menu = require('../models/menu');

//use for pages that require login
var requirelogin = function requirelogin(req, res, next){
    if(!req.user){
      res.render('index', {
        error: 'Please log in'
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
    /*User.findOne({email: req.user.email}, function(err, user){
      console.log("user email is " + req.user.email);
      if (!user){
         res.render('menu', {error: 'Please log in'});
         console.log("user not found " + user);
      }
      else{
        req.session.user = user;
        res.render('menu', {email: user.email, barname: user.nameofbar, password: req.body.password, address:user.address});
        console.log("user found " + user);
        }
      });*/
    //var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
   /* var user = new User({
        nameOfBar: req.body.nameOfBar,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
   });*/
    // console.log("user dashboard" + user);
    console.log(req.body);
    User.findOneAndUpdate({email: req.body.email}, 
                          {
        nameOfBar: req.body.nameOfBar,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
        
    }, function(err){
      if(err){
        var error = 'Oops something bad happened! Try again';
        res.render('menu', {email: user.email, barname: user.nameofbar, password: req.body.password, address:user.address, error:error});
        console.log("error updating: " + err);
      }
        else{
            var success = 'Saved!';
            res.render('menu', {error: success});
            console.log("new info updated ");
        }
    });
  });

app.put('/dashboard', requirelogin, function(req, res){
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = new User({
        nameofbar: req.body.nameOfBar,
        email: req.body.email,
        password: hash,
        address: req.body.address
   });
    delete user._id;
    console.log("user dashboard" + user);
    User.findOneAndUpdate({email: user.email}, user, {upsert: true}, function(err){
      if(err){
        var error = 'Oops something bad happened! Try again';
        res.render('menu', {email: user.email, barname: user.nameofbar, password: req.body.password, address:user.address, error:error});
        console.log("error updating: " + err);
      }
        else{
            var success = 'Saved!';
            res.render('menu', {error: success});
            console.log("new info updated ");
        }
    });
  });
}