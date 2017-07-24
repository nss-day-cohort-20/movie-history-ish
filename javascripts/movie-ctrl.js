'use strict';
// let $ = require('jquery');
let db = require('./myMovie-factory');
let firebase = require('./firebaseConfig');
let movieMaker = require('./movie-service');

// // Helper function to build a movie obj to send to fb.
function buildUserMovie(movieData) {
  console.log("movie data passed to build", movieData);
  let newWatchlistItem = {
    movie_id: movieData.id,
    poster_path: movieData.poster,
    title: movieData.title,
    uid: firebase.auth().currentUser.uid,
    rating: 0,
    watched: false
  };
  return newWatchlistItem;
}

// helper function to add keys to each movie and keep only movies that match search term
function prepMovies(initResults, searchTerm) {
  let moddedArr = [];
  // Make array of the initResults object's keys
  let idArr = Object.keys(initResults);
  console.log("idArr", idArr);
  // loop through array of keys and add each one to its related object as an id property
  idArr.forEach(function(key) {
    initResults[key].id = key;
    moddedArr.push(initResults[key]);
  });
  // make array containing only titles that contain the user's search term
  let filteredResults = moddedArr.filter( (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return filteredResults;
}

function rateMovie(id, rating) {
  db.saveRating(id, rating)
  .then( (data) => {
    console.log("data", data);
  });
}

module.exports.fetchUserMovies = (searchTerm) => {
  return new Promise( (resolve, reject) => {
    console.log("loading user's movies");
    db.getMovies()
    .then(function(movieData) {
      let filteredMovies = prepMovies(movieData, searchTerm);
      movieMaker.buildCastQueries(filteredMovies)
      .then( (castArr) => {
        console.log("user castArr", castArr);
        let amendedMovies = movieMaker.addCastList(filteredMovies, castArr);
        console.log("amended user list", amendedMovies);
        resolve(amendedMovies);
      });
    });
  });
};

module.exports.attachEvents = () => {

  // Send newMovie data to db
  $(document).on("click", ".add-to-list", function() {
    let movId = $(this).attr("id");
    // pull movie info from the data-attribute on the 'add' btn
    let movData = $(this).data("mov-data");
    // build a new obj to save to FB
    let newMovie = buildUserMovie(movData);
    // console.log("newMovie", newMovie);
    db.addUserMovie(newMovie)
    .then( (movie) => {
      // console.log("movie saved", movie);
      // show banner indicating movie added to watchlist
      // console.log("banner?", $(`#added-${movId}`) );
      $(`#added-${movId}`).removeClass("is-hidden");
      $(this).addClass("added");
    });
  });

  // trigger user star rating
  $(document).on("click", ".active", function() {
    console.log("rating clicked");
    let fbId = $(this).parents(".rating-wrapper").attr("id");
    // The plugin adds a data-val attr to each set of stars when you click to rate
    let rating = $(this).parents(".rating-wrapper").data("val");
    rateMovie(fbId, rating);
  });


// //Save edited song to FB then reload DOM with updated song data
//   $(document).on("click", ".save_edit_btn", function() {
//     let songObj = buildSongObj(),
//         songId = $(this).attr("id");
//     console.log("song id", songId);
//     db.editSong(songObj, songId)
//     .then(function(data){
//       console.log("song saved", data);
//       loadSongsToDOM();
//     });
//   });

//   // Remove song then reload the DOM w/out new song
//   $(document).on("click", ".delete-btn", function () {
//     console.log("btn clicked", $(this).data("delete-id"));
//     db.deleteSong($(this).data("delete-id"))
//     .then(function() {
//       loadSongsToDOM();
//     });
//   });
};

// module.exports = {loadSongsToDOM, attachEvents, displayLoggedInView, displayLoggedOutView};
