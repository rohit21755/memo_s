var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var peopleRouter = require('./routes/people');
var projectsRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');

var app = express();

const port = 5000;

var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '',      // Replace with your database password
  database: '' // // Replace with your database Name
}); 

conn.connect(function(err) {
  if (err)
   console.log("[mysql error]",err);
  console.log('Database is connected successfully !');
});
global.conn=conn

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));        
app.use(bodyParser.json()); // parse form data client         
app.use(fileUpload()); // configure fileupload

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about',aboutRouter);
app.use('/people',peopleRouter);
app.use('/contact',contactRouter);
app.use('/projects',projectsRouter);

app.listen(5000, function() {
  console.log("Server started on port 5000");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
