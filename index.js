'use strict';

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname));




app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Main page. 
app.get('/', function(req, res) {

	res.render('index', {
    title: 'DrinkEasy'
        });
})



//Routes

/*app.get('/applicants', ta.findAll);

app.post('/applicants', ta.addOne);

app.delete('/applicants', ta.delOne);

app.get('/courses', ta.findWithCourses);*/


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
