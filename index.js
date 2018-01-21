'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');

//define controllers
var indexController = require('./controllers/indexController');
var menuController = require('./controllers/menuController');
var billController = require('./controllers/billController');

var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(sessions({
    cookieName: 'session',
    secret: 'vbjvfsb1%bkbeebcs999',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

//Routes
indexController(app);
menuController(app);
billController(app);


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
