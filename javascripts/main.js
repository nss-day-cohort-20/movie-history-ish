"use strict";

let $ = require('jquery'),
    // rateyo = require('rateyo'),
    // db = require("./song-factory"),
    api = require("./movieAPI-factory"),
    movieController = require('./movie-ctrl'),
    user = require('./user-factory'),
    // firebase = require("./firebaseConfig")
    templates = require('./template-builder'),
    $container = $('.uiContainer--songs');

$(document).ready(() => {
  console.log("rateyo");
});
// console.log("rateyo", $.rateYo());
// movieController.attachEvents();

// User login
$("#auth-btn").click(function() {
  console.log("clicked auth");
  user.logInGoogle()
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("logged in user", user.uid );
    // songController.displayLoggedInView();
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
});

// user logout
$("#logout").click(function() {
  user.logout().
  then( () => {
    console.log("user signed out");
    // songController.displayLoggedOutView();
  });
});
// end user stuff ****************************************************

$('#search-api').click(function() {
  console.log("search movies clicked");
  event.preventDefault();
  api.getMovies() //searchInput needed
  .then( (movies) => {
    outputMovies(movies);
  });
});

function outputMovies(moviesData) {
  let movieCards = templates.makeMovieList(moviesData);
  $(".uiContainer--movies").html(movieCards);

  //   $(".rateyo").rateYo({
  //   rating: 3.6
  // });
}
