var User = require('../models/user');
var bcrypt = require('bcrypt');

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


app.get('/', function(req, res) {

	res.render('index', {
    title: 'DrinkEasy'
        });
});

app.post('/signup', function(req, res){
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = new User({
        nameofbar: req.body.nameOfBar,
        email: req.body.email,
        password: hash,
        address: req.body.address
   });
    console.log(user);
    user.save(function(err){
      if(err){
        var error = 'Oops something bad happened! Try again';
        res.render('index', {error: error});
        console.log(err);
      }
        else{
            var success = 'Sign up successful! Please log in';
            res.render('index', {error: success});
        }
    });
});

app.post('/login', function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      if (!user){
         res.render('index', {error: 'Invalid username or password'});
         console.log(user);
      }
      else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          res.render('menu');
          console.log(user);
        }
        else{
          res.render('index', {error: 'Invalid username or password'});
        }
      }
      });
});


/*var file = require('./fileController.js');
app.post('/parsePdf',file.parsePdf);*/

app.get('/login', requirelogin, function(req, res){
    res.render('menu');
  });


app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
  });

};
