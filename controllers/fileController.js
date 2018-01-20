'use strict'; 

var Menu = require('../models/menu');

var fs = require('fs');

var dateFormat = require('dateformat');

/*multer reads files*/
var multer  =   require('multer');

/*set directory where the uploaded file must go*/
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-Syllabus' + Date.now());
  }
});

/*upload handles input called 'file'*/
var upload = multer({ storage : storage}).array('file',12);

var menuObj;

/*fs.readFile('menu.json', 'utf-8', function(err, data) {
    if(err) throw err;
    menuObj = JSON.parse(data);
    console.log(menuObj); 
});*/

exports.uploadMenuForm = function(req, res){
  upload(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    res.render('menu');
  })
}


/*helper function to split text file line by line and read*/
function read(req,file, cb) {
  var filePath = './uploads/'+file;

  var barData = [];
  var menu =[];

  fs.readFile(filePath, 'utf8', function(err, data) {

    for(drink in data.drinks){

      menu.push({
          "name": drink.drinkName,
          "price": drink.price,
          "description": drink.description,
        });
    }


    barData.push({
      "email": data.email,
      "drinks": menu

    });

  console.log("just read this from the file for user" + data.email);

    var temp = {"menu" : barData}
    menuObj.courses.push(temp.menu[0]);

    var json = JSON.stringify(menuObj);

    var uploadedMenu = new Menu({barData});

    uploadedMenu.save(function(err){
      if(err){
        var error = 'Oops something bad happened! Try again';
        res.render('menu', {error: error});
        console.log(err);
      }
        else{
            var success = 'Data updated';
            res.render('account', {error: success});
        }
    });

    
  fs.unlinkSync(filePath);
})
}

//parse pdf and upload the parsed file to console 
exports.parseMenu = function(req, res) {
    console.log('parsePdf');
    var finalObj;
    var count = 0;
    var duplicate_flag = 0;
    fs.readdir('./uploads', function(err, filenames) {

      console.log(filenames);

    if (err) {
      throw err;
      return;
    }
    filenames.forEach(function(filename) {
      count++;
       console.log("count is "+count);
       read(req,filename)

    })
  });
  
}