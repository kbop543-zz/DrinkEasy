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

var menuObj= [];


function uploadMenuForm(req, res){
  console.log("uploaded Menu")
  upload(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
  })
}


/*helper function to split text file line by line and read*/
function read(res,req,file, cb) {
  var filePath = './uploads/'+file;

  var barData = [];
  var menu =[];

  fs.readFile(filePath, 'utf8', function(err, data) {
    var dataJson = JSON.parse(data)[0];


    for(let i in dataJson.drinks){

      menu.push({
          "drinkName": dataJson.drinks[i].drinkName,
          "price": dataJson.drinks[i].price,
          "description": dataJson.drinks[i].description,
        });
    }



    barData.push({
      "company": dataJson.company,
      "email": dataJson.email,
      "drinks": menu,
      "keepTab": dataJson.keepTab

    });

    var temp = {"menu" : barData}
    var uploadedMenu = new Menu(temp.menu[0]);


    //find the menu

    Menu.findOne({
            'email': dataJson.email
        }, function(err, foundMenu) {
            if (err) throw err;

            if (foundMenu != null) {
              console.log("menu already existed. replacing it");

                // Remove the menu
                Menu.remove({
                    'email': dataJson.email
                }, function(err) {



                    uploadedMenu.save(function(err){
                      if(err){
                        var error = 'Oops something bad happened! Try again';
                        res.render('menu', {error: error});
                        console.log(err);
                      }
                        else{
                            var success = 'Data updated';
                            res.render('menu', {menu: uploadedMenu});
                        }
                    });
                });

            } else {
              console.log("menu didnt exist. adding brand new menu");
              console.log(uploadedMenu);

                    uploadedMenu.save(function(err){
                      if(err){
                        var error = 'Oops something bad happened! Try again';
                        res.render('menu', {error: error});
                        console.log(err);
                      }
                        else{
                            var success = 'Data updated';
                            res.render('menu', {menu: uploadedMenu});
                        }
                    });
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
    upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      console.log('uploadPdf');
    });
    fs.readdir('./uploads', function(err, filenames) {

      console.log(filenames);

    if (err) {
      throw err;
      return;
    }
    filenames.forEach(function(filename) {
      if(filename[0] == 'f'){
      count++;
       console.log("count is "+count);
       read(res,req,filename)
     }

    })

  });

}
