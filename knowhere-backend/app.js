var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var environment = process.env.NODE_ENV || 'DEV';

var index = require('./routes/index');

var app = express();

//Setup Environment Variables
setupEnv(environment);
app.set('environment', environment);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(app, passport);

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed


app.all('/api/v1/*', [require('./middleware/validateRequest')]);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'error':err.message});
});

module.exports = app;

function setupEnv(environment) {
   var dbMode = 'MODE_' + environment;
   app.set('dbMode', dbMode);

   var igClientId = process.env[environment + '_IG_CLIENT_ID'];
   app.set('IG_CLIENT_ID', igClientId); 

   var igClientSecret = process.env[environment + '_IG_CLIENT_SECRET'];
   app.set('IG_CLIENT_SECRET', igClientSecret); 

   var fbClientId = process.env[environment + '_FB_CLIENT_ID'];
   app.set('FB_CLIENT_ID', fbClientId); 

   var fbClientSecret = process.env[environment + '_FB_CLIENT_SECRET'];
   app.set('FB_CLIENT_SECRET', fbClientSecret); 
}

