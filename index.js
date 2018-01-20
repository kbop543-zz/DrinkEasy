'use strict';

var express = require('express');
var bodyParser = require('body-parser');

//define controllers
var indexController = require('./controllers/indexcontroller');

var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname));




app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//Routes
indexController(app);


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
