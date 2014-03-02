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

//Return All Users
exports.get_calendar = function(req, res){
	var response = {
		"events": mockData["events"],
		"error": mockData["error"]
	};
	res.contentType('application/json');
  	var json = JSON.stringify(response);
  	res.send(json);
}

/*
app.post('/user/:"id"', user.post_user_"id"); 
//Edits Individual User Record With "id"

app.post('/user', user.post_user);
//Creates A New User
*/
