var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
const  google = require('googleapis');

var app = express();

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

app.use('/', index);
app.use('/users', users);
app.get('/login/', (req, res)=>{
  console.log('/login');
  const url  = require('./index').URL;
  console.log(`url ${url}`);
  res.redirect(url);
})


app.get('/auth', (req, res)=>{
  console.log('/auth')
  const oauth2Client  = require('./index').client;
  let code = req.query.code;
  console.log(`code: ${code}`);
  oauth2Client.getToken(code, function (err, tokens) {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if (!err) {
    oauth2Client.setCredentials(tokens);
    var plus = google.plus('v1');
    plus.people.get({
      auth: oauth2Client,
      userId: '+google'
    }, function (err, user) {
      console.log('Result: ' + (err ? err.message : user.displayName));
    });
    res.sendStatus(200, 'worked');
    return;
  }
  return res.sendStatus(500, err);
  });

})
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
  res.render('error');
});

module.exports = app;
