let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// import the virtual host module for handling subdomain based routes
let vhost = require('vhost');

// import mongoose module
let mongoose = require('mongoose');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let kumenoga = require('./routes/kumenoga');
let adminRouter = require('./routes/admin');

// setting mongoDB default connection
let mongoDB = "mongodb://127.0.0.1:27017/kumenoga";
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false});

// getting mongoDB default connection
let db = mongoose.connection;

// handling an error during connection
db.on('error', function() {
    console.log("Error when connecting with mongoDB...");
});

// handling the 'open' event when connected with mongoDB
db.on('open', function() {
    console.log("Connected with mongoDB successful...");
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/favicon')));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public/category_images')));
app.use(express.static(path.join(__dirname, 'public/team_images')));
app.use(express.static(path.join(__dirname, 'public/fontawesome/css')));
app.use(express.static(path.join(__dirname, 'public/fontawesome/js')));
app.use(express.static(path.join(__dirname, 'public/fontawesome/webfonts/')));


// setting app midlleware to use vhost to handle the subdomain
// the subdomain has the hostname starting with 'admin.*'

app.use(vhost('admin.*', adminRouter));

app.use('/', indexRouter);
app.use('/app', kumenoga);
app.use('/users', usersRouter);

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
