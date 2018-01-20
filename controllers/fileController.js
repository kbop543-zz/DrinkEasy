'use strict'; 

var User = require('../models/user');

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



var courseObj;
var flag = 0;

fs.readFile('courses.json', 'utf-8', function(err, data) {
    if(err) throw err;
    courseObj = JSON.parse(data);
    console.log(courseObj);
    
});

exports.uploadSyllabus = function(req, res){
  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.sendfile('views/index.html');
    });

}

/*helper function to split text file line by line and read*/
function read(req,file, cb) {
  var filePath = './uploads/'+file;


  var everything = [];
  var markables =[];
  var courseData2;
  var courseData;
  

  let i,j,k,l;

  fs.readFile(filePath, 'utf8', function(err, data) {
    var myRegexp = /(.*)\n(.*)([\w\d\s\W\D\S]*Description\s*Weight\s*Due\s*)([\w\d\s\W\D\S]*)/g;
  var match = myRegexp.exec(data);
  var courseCode;
  var courseName;


 
  while (match != null) {
    courseCode = match[1];
    courseName = match[2]
    courseData = match[4];
    break;

  }


  courseData2 = courseData.split("\n");

  //filter out empty strings that are there as a result of spaces between lines
  courseData2 = courseData2.filter(function(element){
    return element !== "";
  })

  for(i=0, j=1, k = 2, l=3;
   i< courseData2.length 
   && j<courseData2.length 
   && k<courseData2.length 
   && l<courseData2.length; i+=4,j+=4,k+=4,l+=4){


    markables.push({
      "name": courseData2[i],
      "description": courseData2[j],
      "weight": courseData2[k],
      "dueDate": courseData2[l],
      "grade": null

    })
    
  }

  everything.push({
      "courseCode": courseCode,
      "courseName": courseName,
      "markables": markables,
      "grade": null
    });
  console.log("just read this from the file" + courseCode);

    var temp = {"courses" : everything}
    courseObj.courses.push(temp.courses[0]);
    //console.log(courseObj);
    var json = JSON.stringify(courseObj);
    //console.log(json);

    if(req.session.username != null){
    User.findOne({'username': req.session.username}, function(err, username){
      //if courseObj has something in it, traverse it and see if the course we are trying to have 
      //already there
      if(username.courseObj != null){
        var usernameCourses = JSON.parse(username.courseObj);
        for(let i = 0; i< usernameCourses.courses.length; i++){

          let course = usernameCourses.courses[i].courseCode;
          console.log("reading courses from schema" + course);
          if(course == temp.courses[0].courseCode){
            console.log(course + "is a duplicate");
            flag = 1;
            break;
          }else{
            flag = 0;
          }
        }
        if(flag != 1){
          
          usernameCourses.courses.push(temp.courses[0]);
          username.courseObj = JSON.stringify(usernameCourses);
          cb(username.courseObj);
        }else{
          cb(flag);
          return;
        }
      }else{
        username.courseObj = json;
        cb(username.courseObj);
        courseObj.courses
        flag = 0;
      }
      username.save(function(err) {
        if (err) throw err;
      })
      //console.log(username);
      

      
  })
  }
  
  fs.unlinkSync(filePath);
})
}

//parse pdf and upload the parsed file to console 
exports.parsePdf = function(req, res) {
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
      read(req,filename, function(data) {
        if(data == 1){
          duplicate_flag = 1;
        }
        
        
      });
  })

})
    fs.readdir('./uploads', function(err, files) {
    if (err) {
       throw err;
    } else {
       if (!files.length) {
           flag=0;
       }
    }
});

    var empty_array = [];
      let reset_courses = {"courses" : empty_array}
      courseObj = reset_courses;
      // console.log(courseObj);

    if(flag || duplicate_flag){
      console.log(flag);
      console.log(duplicate_flag);
      res.status(500).send("Error: duplicate syllabus course");
    }else{
      if(req.session.username != null){
        User.findOne({'username': req.session.username}, function(err, username){
          // console.log(username.courseObj);
          if(username.courseObj == null){
            res.send("You haven't uploaded anything yet!");

          }else{
            res.send(username.courseObj);
          }
        });
      }
    }
}

/* Add Markable */
exports.addMarkable = function(req, res) {
    console.log('addMarkable');
    console.log(req.body);
    if(req.session.username != null){
      User.findOne({'username': req.session.username}, function(err, username){
        var calendarObj = JSON.parse(username.courseObj);
        // console.log(req.body);
        var markableName = req.body.markableName;
        var description = req.body.description;
        var weight = req.body.weight;
        var dueDate = req.body.dueDate;
        var courseName = req.body.courseName;
        console.log("courseName is:")
        console.log(courseName);
        var index = null;
        var i = null;
        for (i = 0; i < calendarObj.courses.length; i++) { 
          if (calendarObj.courses[i].courseCode.search(courseName) != -1) {
            index = i;
          }
        }
        var courseFromForm = calendarObj.courses[index];
        courseFromForm.markables.push({'name': markableName, 'description': description, 
          'weight': weight, 'dueDate': dueDate});
        calendarObj.courses[index] = courseFromForm;
        username.courseObj = JSON.stringify(calendarObj);
        username.save(function(err) {
          if (err) throw err;
        })
        res.send(username.courseObj);
      });
    }
}

exports.addMarkableGrade = function(req, res){
  console.log("Adding a grade to a markable.");

  if(req.session.username != null){
    User.findOne({'username': req.session.username}, function(err, username){
      //if courseObj has something in it, traverse it and see if the course we are trying to have 
      //already there
      
        var usernameCourses = JSON.parse(username.courseObj);
        for(let i = 0; i< usernameCourses.courses.length; i++){

          let course = usernameCourses.courses[i].courseCode;
          console.log("reading courses from schema" + course);
          if(course == req.query.courseName){
            console.log(course);
            for(let j = 0; j< usernameCourses.courses[i].markables.length;
              j++){
              let markableName = usernameCourses.courses[i].markables[j].name;
              if(markableName == req.query.markableName){
                console.log(markableName);
                usernameCourses.courses[i].markables[j].grade =req.body.markableGrade;
                break;
              }
            }
          }
        }

        for(let i = 0; i< usernameCourses.courses.length; i++){

          let course = usernameCourses.courses[i].courseCode;
          console.log("reading courses from schema" + course);
          if(course == req.query.courseName){
            var denominator = 0;
            var numerator = 0;
            
            //calculate course grade using http://faculty.weber.edu/brandonkoford/Howtocalculateyourgrade.pdf
            for(let j = 0; j< usernameCourses.courses[i].markables.length;
              j++){

              let markableGrade = usernameCourses.courses[i].markables[j].grade;
            if(markableGrade != null){
            //markableGrade = markableGrade.slice(0,-1);
            console.log(markableGrade);
              let markableWeight = usernameCourses.courses[i].markables[j].weight;
               markableWeight = markableWeight.replace('%',"");
              console.log('markable weight: ' + markableWeight);
              //if there is a grade with the markable add its weight to the denominator
              //and multiply grade and weight here
              
                denominator += parseFloat(markableWeight);
                //console.log(denominator);
                console.log('denominator: ' + denominator + ' for ' + usernameCourses.courses[i].markables[j].name);
                
                //numerator here
                var totalDecimal = parseFloat(parseFloat(denominator)/100);
                var decimal = parseFloat(parseFloat(markableWeight)/100)
                console.log('decimal is '+ decimal);

                numerator += markableGrade * decimal;
                console.log('numerator:' + numerator + ' for ' + usernameCourses.courses[i].markables[j].name);
                usernameCourses.courses[i].grade = (numerator /totalDecimal).toFixed(2);
                console.log(usernameCourses.courses[i].grade);
                console.log('___________________________')
                username.courseObj = JSON.stringify(usernameCourses);

                //console.log(username.courseObj.courses[i].markables[j]);
            }
                
              }
            }
            
          }
        
        username.save(function(err) {
        if (err) throw err;
      })
        //console.log(username.courseObj);
        res.send(username.courseObj);
      })
  }
}

exports.delCourse = function(req, res){
  console.log("Deleting a course.");

  // Find the user first
    User.findOne({
        'username': req.session.username
    }, function(err, username) {
        if (err) throw err;

        // If user found, remove the user and send success message
        if (username != null) {


          var calendarObj = JSON.parse(username.courseObj);
          var index;
        
        for (var i = 0; i < calendarObj.courses.length; i++) { 
          if (calendarObj.courses[i].courseCode.search(req.query.courseName) != -1) {
            index = i;
          }
        }
        calendarObj.courses.splice(index,1);
        
        username.courseObj = JSON.stringify(calendarObj);
        username.save(function(err) {
          if (err) throw err;
        })
      }
        res.send(username.courseObj);
      });
}

exports.deleteMarkable = function(req, res){
  console.log("Deleting a markable.");

  // Find the user first
    User.findOne({
        'username': req.session.username
    }, function(err, username) {
        if (err) throw err;

        // If user found, remove the user and send success message
        if (username != null) {

          var calendarObj = JSON.parse(username.courseObj);
          var courseIndex;
          var markableIndex;
          
          for (var i = 0; i < calendarObj.courses.length; i++) { 
            var courseCode = calendarObj.courses[i].courseCode.trim();
            if (courseCode === req.query.courseName) {
              courseIndex = i;
              for (var j = 0; j < calendarObj.courses[courseIndex].markables.length; j++) { 
                if (calendarObj.courses[courseIndex].markables[j].name === 
                  req.query.markableName) {
                  markableIndex = j;
                }
              }
            }
          }
          calendarObj.courses[courseIndex].markables.splice(markableIndex,1);
          
          username.courseObj = JSON.stringify(calendarObj);
          username.save(function(err) {
            if (err) throw err;
          })
      }
        res.send(username.courseObj);
      });
}