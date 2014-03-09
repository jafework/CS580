
/**
 * Module dependencies.
 */

var express = require('express');
var mysql = require('mysql');
var routes = require('./routes');
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

var connection = mysql.createConnection({
host : 'mysql.orderofn.com',
user : 'orderofncom',
password : 'fFYEptEA',
database : 'orderofn_com'
});
connection.connect();
var user = require('./routes/user')(connection);
var schedule = require('./routes/schedule')(connection);

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

//--------------------------------User Routes------------------------------------------|

//Create a new user
//app.post('/user', user.create_new_user);

//Create a new administrator
//app.post('/user/administrator', user.create_new_administrator);

//Return meeting
app.get('/schedule', schedule.get_calendar);

//Return All Users
app.get('/user', user.get_user); 

//Return Individual User Record With ID
app.get('/user/:ID', user.get_user_ID); 

//Delete Individual User
//app.delete('/user/:ID', user.delete_user_with_ID);

//Edit user with ID
//app.post('/user/:ID', user.edit_user_with_ID);

//--------------------------------Calender Routes--------------------------------------|

/*
//Get Meeting Info For Meeting ID
app.get("/meeting/:ID", meeting.get_meeting_with_MeetingID);

//Create A New meeting
app.post("/meeting", meeting.create_new_meeting);

app.get('/schedule/:ID', schedule.get_schdule_with_ID);

app.post('/meeting/:ID', meeting);

//Return User Calendar
app.get('/schedule/:ID', schedule.get_calendar); //NEW
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});












