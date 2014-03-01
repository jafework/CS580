
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var schedule = require('./routes/schedule');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/administration', function(req, res){
  res.sendfile(__dirname + '/public/static/administration.html');
});
app.get('/index', function(req, res){
  res.sendfile(__dirname + '/public/static/index.html');
});
app.get('/employee', function(req, res){
  res.sendfile(__dirname + '/public/static/employee.html');
});
app.get('/calendar', function(req, res){
  res.sendfile(__dirname + '/public/static/calendar.html');
});

app.get('/schedule', schedule.get_calendar); 
//Return User Calendar

app.get('/user', user.get_user); 
//Return All Users

app.get('/user/:ID', user.get_user_ID); 
//Return Individual User Record With ID

//app.post('/user/:ID', user.post_user_ID); 
//Edits Individual User Record With ID

//app.post('/user', user.post_user);
//Creates A New User

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});












