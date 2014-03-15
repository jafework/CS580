/*
	User Schema:
	"id"----------(int)
	Name--------(string)
	Email-------(string)
	Password----(string)
*/

var mockData = {
	events: [
		{
			title: 'All Day Event',
			start: '2014-01-01'
		},
		{
			title: 'Long Event',
			start: '2014-01-07',
			end: '2014-01-10'
		},
		{
			id: 999,
			title: 'Repeating Event',
			start: '2014-01-09T16:00:00',
		},
		{
			id: 999,
			title: 'Repeating Event',
			start: '2014-01-16T16:00:00'
		},
		{
			title: 'Meeting',
			start: '2014-01-12T10:30:00',
			end: '2014-01-12T12:30:00'
		},
		{
			title: 'Lunch',
			start: '2014-01-12T13:00:00',
			invitedBy: 'somebody',
			accept: 'yes',
			decline: 'no'
		},
		{
			title: 'Birthday Party',
			start: '2014-01-13T07:00:00'
		},
		{
			title: 'Click for Google',
			url: 'http://google.com/',
			start: '2014-01-28'
		}
	],
	"error":{
		"code":0,
		"status":"success"
	}
};

module.exports = function(con){
	connection = con;
	return exports;
}

exports.get_calendar = function(req, res){

	connection.query('select * from Meeting', function(err, data) {
		var response = {
			"events": data,
			"error": null
		};
		res.contentType('application/json');
	  	var json = JSON.stringify(response);
	  	res.send(json);
	});
}

exports.create_new_meeting = function(req, res){
	console.log(req.body);

	var OwnerUserID = req.body.OwnerUserID;
	var title = req.body.title;
	var start = req.body.start;
	var end = req.body.end;
	var room = req.body.room;
	var invitedUsers = req.body.invited;

	var query = "INSERT INTO `Meeting` (`OwnerUserID`, `title`, `start`,`end`,`room`) VALUES (?, ?, ?, ?, ?)";
	connection.query(query, [OwnerUserID, title, start, end, room], function(err, data) {
		
		var MeetingID = data.insertId;

		var insertAttendeeQuery = "INSERT INTO `Attendee` (`AttendeeUserID`, `MeetingID`, `Status`) VALUES "
		for(var i = 0; i < invitedUsers.length ; i++){
			insertAttendeeQuery = insertAttendeeQuery + "(" + invitedUsers[i].attendeeID + "," + MeetingID + ",'" + invitedUsers[i].stat + "')";
			if(i+1 < invitedUsers.length){
				insertAttendeeQuery = insertAttendeeQuery + ",";
			}
		}

		console.log(insertAttendeeQuery);

		var query = "INSERT INTO `Attendee` (`AttendeeUserID`, `MeetingID`, `Status`) VALUES (?, ?, ?)";
		connection.query(insertAttendeeQuery, function(err, data) {
			var response = "";
			res.contentType('application/json');
	  		var json = JSON.stringify(response);
	  		res.send(json);
		});

	});

}

exports.create_attendee = function(req, res){
	console.log(req.body);
	var AttendeeUserID = req.body.attendeeID;
	var MeetingID = req.body.mID;
	var Status = req.body.stat;
	

	var query = "INSERT INTO `Attendee` (`AttendeeUserID`, `MeetingID`, `Status`) VALUES (?, ?, ?)";
	connection.query(query, [AttendeeUserID, MeetingID, Status], function(err, data) {
		var response = "";
		res.contentType('application/json');
  		var json = JSON.stringify(response);
  		res.send(json);
	});

}


function getName(req)
{
	connection.query('select * from Users', function(err, data) {
		for(i in data)
		{
			if(req == data[i]["UserID"]){
				console.log(data[i]["Name"]);
				return data[i]["Name"];						
			}

		}
	});
}
/*
app.post('/user/:"id"', user.post_user_"id"); 
//Edits Individual User Record With "id"

app.post('/user', user.post_user);
//Creates A New User
*/
