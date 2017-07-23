"use strict";

let $ = require('jquery'),
    // rateyo = require('rateyo'),
    apiCtrl = require("./api-controller"),
    user = require('./user-controller'),
    movieCtrl = require('./movie-ctrl'),
    templates = require('./template-builder'),
    $container = $('.uiContainer--songs');

$(document).ready(() => {
  console.log("rateyo");
});
// console.log("rateyo", $.rateYo());
movieCtrl.attachEvents();

// User login
$("#auth-btn").click(function() {
  user.login();
});

$('#search-btn').click(function() {
  console.log("search movies clicked");
  event.preventDefault();
  Promise.all([movieCtrl.fetchUserMovies(), apiCtrl.searchMovies($('.search-box').val())])
  .then( (data) => {
    console.log("completed results?", data);
    outputMovies(data[1]);
    $('.filter-btn').removeClass("disabled");
  });
  // .then( (movies) => {

  // });
});

function outputMovies(moviesData) {
  let movieCards = templates.makeMovieList(moviesData);
  $(".movie-list").html(movieCards);

  //   $(".rateyo").rateYo({
  //   rating: 3.6
  // });
}
