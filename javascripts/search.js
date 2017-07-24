'use strict';

let apiCtrl = require("./api-controller");
let movieCtrl = require('./movie-ctrl');
let templates = require('./template-builder');

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
});

$('.filter-btn').click( function() {
  event.preventDefault();
  // match the button's name attr with the classes on the movie cards
  let cardClass = `.${$(this).attr("title")}`;
  $(".movie-list__item").hide();
  $(cardClass).show();
});

function outputMovies(moviesData) {
  console.log("allMovies", moviesData );
  let movieCards = templates.makeMovieList(moviesData);
  $(".movie-list").html(movieCards);
  $(".rating").starRating({
    minus: true // step minus button
  });
  console.log($(".rating-wrapper"));
  // Loop through all the cards with rating wrappers and set the right number
  // of stars to "active" based on the rating from FB
  $(".rating-wrapper").each( function(i, element) {
    let ratingNum = parseInt($(this).data("rating"));
    let $stars = ($(this).find("li"));
    $stars.slice(0, ratingNum).addClass("active");
  });
}
