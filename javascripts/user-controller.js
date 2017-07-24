'use strict';

// let $ = require('jquery');
let userFactory = require('./user-factory');

// User login
$("#auth-btn").click(function() {
  login();
});

// user logout
$("#logout").click(function() {
  userFactory.logout().
  then( () => {
    console.log("user signed out");
  });
});

function login() {
  userFactory.logInGoogle()
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("logged in user", user.uid );
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    alert(errorMessage);
  });
}


