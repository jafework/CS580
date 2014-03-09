/*
	User Table Schema:
	ID----------(int)
	Name--------(string)
	Email-------(string)
	Password----(string)

	Mock JSON Structure:
	{
		"response":[
			{
				"UserID":1,
				"Name":"Joseph",
				"Email":"test@test.com",
			},
			{
				"UserID":2,
				"Name":"Lan",
				"Email":"lan@gmail.com",
			}
		],
		"error":{
			"code":0,
			"status":"success"
		}
	}
*/

var connection;

//Return All Users
module.exports = function(con){
	connection = con;
	return exports;
}

exports.get_user = function(req, res){
	
	connection.query('select * from Users', function(err, data) {		
		var response = {
			"users": data,
			"error": null
		};
		res.contentType('application/json');
  		var json = JSON.stringify(response);
  		res.send(json);

	});
}

//Return Individual User Record With ID
exports.get_user_ID = function(req, res){

	connection.query('select * from Users', function(err, data) {	
	
		var userID = parseInt(req.params.ID);
		console.log("abcd",userID);
		console.log(data[1]["Name"]);
		var userInfo;
		for(index in data){
			if(data[index]["UserID"] === userID){
				userInfo = data[index]["Name"];
				break;
			}
		}
	
		var response = {
			"Name": userInfo,
			"error": null
		};
		res.contentType('application/json');
  		var json = JSON.stringify(response);
  		res.send(json);

	});

	/*var userID = parseInt(req.params.ID);
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
  	res.send(json);*/
}

//Delete User With ID
exports.delete_user_with_ID = function(req, res){

};
/*
app.post('/user/:ID', user.post_user_ID); 
//Edits Individual User Record With ID

app.post('/user', user.post_user);
//Creates A New User
*/
