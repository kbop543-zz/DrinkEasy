var Bill = require('../models/outstanding');
var bcrypt = require('bcrypt');
var Menu = require('../models/menu');
var querystring = require('querystring');
var request = require('request');

module.exports = function(app){

  app.get('/outstanding', function(req,res){
    Menu.findOne({email: req.session.user.email}, function(err, menu){
      console.log(req.session.user.email);
      console.log(menu);
      if (!menu){
        res.render('billPreviews',
        {email: req.user.email,
           barname: req.user.nameOfBar,
            password: req.user.password,
             address:req.user.address,
           alreadySetUp: false});
         }else{
           res.render('billPreviews',
           {email: req.user.email,
              barname: req.user.nameOfBar,
               password: req.user.password,
                address:req.user.address,
              alreadySetUp: true});
         }
       });
  })

      app.get('/money-requests/send', function(req, res){
          res.render('billPreviews');
      });


      app.get('/pay', function(req, res){
          var reqbody = {
            "referenceNumber": "1234567",
            "sourceMoneyRequestId": "abc12345",
            "requestedFrom": {
              "contactId": "CAX2akZQbrbN",
              "contactHash": "0a53d34b4e2fd99e74a95fa8be0482a6",
              "contactName": "ryan",
              "language": "en",
              "notificationPreferences": [
                {
                  "handle": "nourbaa@mcmaster.ca",
                  "handleType": "email",
                  "active": true
                }
              ]
            },
            "amount": 20,
            "currency": "CAD",
            "editableFulfillAmount": false,
            "requesterMessage": "This is your bar tab. Pay as soon as possible",
            "invoice": {
              "invoiceNumber": "1111113",
              "dueDate": "2018-03-28"
            },
            "expiryDate": "2018-04-28",
            "supressResponderNotifications": false,
            "returnURL": "https://cnn.com",
            "creationDate": "2018-01-20",
            "status": 0,
            "fulfillAmount": 20,
            "responderMessage": "string",
            "notificationStatus": 0
        };

        var reqbodystring = querystring.stringify(reqbody);

        request({
            headers: {
                "accessToken": "Bearer b593a867-a362-4170-a912-f71eedcd0373",
                "thirdPartyAccessId": "CA1TAt74FQb6KdZ5",
                "requestId": "abc123",
                "deviceId": "abc123",
                "apiRegistrationId": "CA1ARJhg4HAJcaSg",
            },

        uri: 'https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send',
        body: reqbodystring,
        method: 'GET'
    }, function(err, res, body){
            if(err){
                console.log("error is " + err );
            }

            console.log("body is " + body);
    });

          /*console.log('coming');
          var req2 = {
              header: {
                  "accessToken": "Bearer b593a867-a362-4170-a912-f71eedcd0373",
                  "thirdPartyAccessId": "CA1TAt74FQb6KdZ5",
                  "requestId": "abc123",
                  "deviceId": "abc123",
                  "apiRegistrationId": "CA1ARJhg4HAJcaSg",
              },

            body: {
              "referenceNumber": "12345",
              "sourceMoneyRequestId": "abc123",
              "requestedFrom": {
                "contactId": "CAX2akZQbrbN",
                "contactHash": "0a53d34b4e2fd99e74a95fa8be0482a6",
                "contactName": "ryan",
                "language": "en",
                "notificationPreferences": [
                  {
                    "handle": "nourbaa@mcmaster.ca",
                    "handleType": "email",
                    "active": true
                  }
                ]
              },
              "amount": 20,
              "currency": "CAD",
              "editableFulfillAmount": false,
              "requesterMessage": "This is your bar tab. Pay as soon as possible",
              "invoice": {
                "invoiceNumber": "111111",
                "dueDate": "2018-03-28T16:12:12.721Z"
              },
              "expiryDate": "2018-03-28T16:12:12.721Z",
              "supressResponderNotifications": false,
              "returnURL": "https://cnn.com",
              "creationDate": "2018-01-28T16:12:12.721Z",
              "status": 0,
              "fulfillAmount": 20,
              "responderMessage": "string",
              "notificationStatus": 0
            }
        };

         app.put('https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send', function(req2, res2){
             if(res2){
                 console.log('YES');
             }else{
                 console.log('NO');
             }
         });*/
     });

  };
