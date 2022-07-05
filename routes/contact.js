var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});


router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
 
  // insert user data into users table
  var sql = 'INSERT INTO cf SET ?';
  conn.query(sql, userDetails,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
      res.send("success");
  });
}); 

module.exports = router;