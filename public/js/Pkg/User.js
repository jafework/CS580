/*
        User Class:
        An instance of this class represents a single User object.

        Global Variables:
        ID
        Name
        Email

        Constructors:
        User(ID)
        User(ID,Name,Email)

        Methods:
        Save() - Saves the changes to the server
        Reload() - Reloads the user data from the server
    */


function User(ID,Name,Email){
  this.ID = ID;
  this.Name = Name;
  this.Email = Email;
  this.Save = User_Save;
  this.Reload = User_Reload;
  this.Create = User_Create;
}


function SaveUser(){
  User_Create();
}

function User_Create(completionHandler){
  
  var newName = $('#SelectedUserEditName').val();
  var newEmail = $('#SelectedUserEditEmail').val();
  var newPassword = $('#SelectedUserEditNewPasswordConfirm').val();
  var postData = {
    name : newName,
    email : newEmail,
    password: newPassword
  }

  $.post(serverAddress + "user/", postData, function(data){
    completionHandler();
  });
}

function User_Reload(completionHandler){
  var self = this;
  $.get( serverAddress + "user/" + self.ID, function( data ) {
    self.ID = data["ID"];
    self.Name = data["Name"];
    self.Email = data["Email"];
    completionHandler();
  });
}

function User_Save(){
  //Post Changes
}
