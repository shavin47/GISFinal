var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var framework = require('framework');

var routes = require('./routes/index');
var users = require('./routes/users');
var map = require('./routes/map');

var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/GIS');

//Make DB accessible to Router
app.use(function(req, res, next){
  req.db = db; 
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', routes);
app.use('/users', users);
app.use('/map', map.showMap);
app.use('/node/:name/:lat/:long/add', framework.addNode);
app.use('/node/:lat/:long/remove', framework.removeNode);
app.use('/viewnamednodes/:name', framework.viewNamedNodes);
app.use('/nodemap', framework.viewAllNodes);
app.use('/node/:lat/:long/nodemap', framework.viewAllNodes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
