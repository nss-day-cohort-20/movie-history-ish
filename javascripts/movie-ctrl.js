'use strict';
let $ = require('jquery');
let db = require('./myMovie-factory');
let firebase = require('./firebaseConfig');
let movieMaker = require('./movie-service');

// // change view based on user state
// function displayLoggedInView(){
//   loadSongsToDOM();
//   $("#see-user-list, #logout").removeClass("is-hidden");
//   $('#auth-btn').addClass("is-hidden");
// }

// function displayLoggedOutView() {
//   $("#see-user-list, #logout").addClass("is-hidden");
//   $('#auth-btn').removeClass("is-hidden");
//   $container.html("");
// }

// // Helper function to build a movie obj to send to fb.
function buildUserMovie(movieData) {
  console.log("movie data passed to build", movieData);
  let newWatchlistItem = {
    movie_id: movieData.id,
    movie_poster: movieData.poster,
    movie_title: movieData.title,
    uid: firebase.auth().currentUser.uid,
    rating: 0,
    watched: false
  };
  return newWatchlistItem;
}

module.exports.fetchUserMovies = () => {
  return new Promise( (resolve, reject) => {
    console.log("loading user's movies");
    db.getMovies()
    .then(function(movieData) {
      let resultsArr = [];
      let idArr = Object.keys(movieData);
      console.log("idArr", idArr);
      idArr.forEach(function(key) {
        movieData[key].id = key;
        resultsArr.push(movieData[key]);
      });
      movieMaker.buildCastQueries(resultsArr)
      .then( (castArr) => {
        console.log("user castArr", castArr);
        let amendedMovies = movieMaker.addCastList(resultsArr, castArr);
        console.log("amended user list", amendedMovies);
        resolve(amendedMovies);
      });
    });
  });
};

module.exports.attachEvents = () => {

//   // display song list
//   $('#see-list').click(loadSongsToDOM);

//   // display user's list
//   $('#see-user-list').click(loadSongsToDOM);

  // Send newMovie data to db
  $(document).on("click", ".add-to-list", function() {
    let movId = $(this).attr("id");
    // pull movie info from the data-attribute on the 'add' btn
    let movData = $(this).data("mov-data");
    // build a new obj to save to FB
    let newMovie = buildUserMovie(movData);
    console.log("newMovie", newMovie);
    db.addUserMovie(newMovie)
    .then( (movie) => {
      console.log("movie saved", movie);
      // show banner indicating movie added to watchlist
      console.log("banner?", $(`#added-${movId}`) );
      $(`#added-${movId}`).removeClass("is-hidden");
      $(this).addClass("added");
    });
  });

// // Load and populate form for editing a song
//   $(document).on("click", ".edit-btn", function() {
//     console.log("edit clicked");
//     let songId = $(this).data("edit-id");
//     db.getSong(songId)
//     .then(function(song) {
//           song.id = songId;
//           let editForm = templates.buildSongForm(song);
//           $container.html(editForm);
//       });
//   });

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
