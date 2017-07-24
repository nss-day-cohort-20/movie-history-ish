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
  let searchVal = $('.search-box').val();
  Promise.all([movieCtrl.fetchUserMovies(searchVal), apiCtrl.searchMovies(searchVal)])
  .then( (data) => {
    console.log("completed results?", data); //logs a nested array
    let watchlist = data[0].uid ? data[0] : data[1];
    let filteredWatchlist = null;
    // combine FB and API results then send to function that adds to DOM
    // http://www.jstips.co/en/javascript/flattening-multidimensional-arrays-in-javascript/
    let allMovies = [].concat(...data);
    outputMovies(allMovies);
    $('.filter-btn').removeClass("disabled");
  });
  // .then( (movies) => {

  // });
});

function outputMovies(moviesData) {
  console.log("allMovies", moviesData );
  let movieCards = templates.makeMovieList(moviesData);
  $(".movie-list").html(movieCards);

  //   $(".rateyo").rateYo({
  //   rating: 3.6
  // });
}
