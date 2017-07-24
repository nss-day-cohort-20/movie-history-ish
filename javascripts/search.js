'use strict';

let apiCtrl = require("./api-controller");
let movieCtrl = require('./movie-ctrl');
let templates = require('./template-builder');
// https://lodash.com/docs/4.17.4#uniqBy Remember lodash? Comes in handy a lot.
// This method allows us to remove duplicate objects from an array based on a shared property
let _uniqBy = require('lodash/uniqBy');

// console.log("_uniqBy", _uniqBy);

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
  console.log("favorite?", cardClass);
  $(".movie-list__item").hide();
  if(cardClass === ".favorite") {
    console.log("fave clicked");
    console.log("fave?", $(".watched").find("div[data-rating='10']"));
    $(".watched").has("div[data-rating='10']").show();
  } else {
    $(cardClass).show();
  }
});

function outputMovies(moviesData) {
  console.log("allMovies", moviesData );
  let uniqueMovies = filterDuplicates(moviesData);
  let movieCards = templates.makeMovieList(uniqueMovies);
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

function filterDuplicates(movies) {
  return _uniqBy(movies, 'poster_path');
}
