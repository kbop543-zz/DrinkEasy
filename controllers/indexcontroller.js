var User = require('../models/user');
var bcrypt = require('bcrypt');

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
       name: req.body.name,
        email: req.body.email,
        password: hash,
        address: req.body.address
   });
    user.save(function(err){
      if(err){
        var error = 'Oops something bad happened! Try again';
        res.render('index', {error: error});
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
      }
      else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          res.redirect('/dashboard');
        }
        else{
          res.render('index', {error: 'Invalid username or password'});
        }
      }
      });
});
    
 
app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
  });
};
