/*
	User Schema:
	ID----------(int)
	Name--------(string)
	Email-------(string)
	Password----(string)
*/

var mockData = {
	"users":[
		{
			"ID":1,
			"Name":"Joseph",
			"Email":"test@test.com",
		},
		{
			"ID":2,
			"Name":"Lan",
			"Email":"lan@gmail.com",
		}
	],
	"error":{
		"code":0,
		"status":"success"
	}
};

//Return All Users
exports.get_user = function(req, res){
	var response = {
		"users": mockData["users"],
		"error": mockData["error"]
	};
	res.contentType('application/json');
  	var json = JSON.stringify(response);
  	res.send(json);
}

//Return Individual User Record With ID
exports.get_user_ID = function(req, res){
	var userID = parseInt(req.params.ID);
	var userInfo;
	for(index in mockData["users"]){
		if(mockData["users"][index]["ID"] === userID){
			userInfo = mockData["users"][index];
			break;
		}
	}
	var response = {
		"users": userInfo,
		"error": mockData["error"]
	};
	res.contentType('application/json');
  	var json = JSON.stringify(response);
  	res.send(json);
}

/*
app.post('/user/:ID', user.post_user_ID); 
//Edits Individual User Record With ID

app.post('/user', user.post_user);
//Creates A New User
*/