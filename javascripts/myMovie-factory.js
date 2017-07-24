"use strict";

// let $ = require('jquery'),
let firebase = require('./firebaseConfig'),
    movieMaker = require('./movie-service'),
    fbURL = "https://movie-hist-d20.firebaseio.com";

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

// // get user's movies
// // use query with orderBy= user id and equalTo the current user
module.exports.getMovies = () => {
  let currentUser = firebase.auth().currentUser.uid;
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/watchlist.json?orderBy="uid"&equalTo="${currentUser}"`//<.json is important!
    }).done( (movieData) => {
      console.log("my movieData", movieData );
      resolve(movieData);
    });
  });
};

module.exports.addUserMovie = (movieObj) => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}/watchlist.json`,
      type: "POST",
      data: JSON.stringify(movieObj),
      dataType: "json"
    }).done( (movieId) => {
      resolve(movieId);
    });
  });
};

module.exports.addMovie = (movieObj) => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}/movies.json`,
      type: "POST",
      data: JSON.stringify(movieObj),
      dataType: "json"
    }).done( (movieId) => {
      resolve(movieId);
    });
  });
};

module.exports.saveRating = (id, rating) => {
  return new Promise( (resolve, reject) => {
    getMovie(id)
    .then( (movie) => {
      // ES6 object shorthand: same as {rating: rating}
      // The new rating number is what we want to update, so editMovie will
      // do a "PATCH" to change just that property
      console.log("movie to update rating", movie);
      editMovie({rating}, id)
      .then( (data) => {
        console.log("rating updated", data );
      });
    })
    .catch( (err) => {
      reject(err);
    });
  });
};

function getMovie(id) {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/watchlist/${id}.json`
    }).done( (movieData) => {
      resolve(movieData);
    });
  });
}
// function deleteSong(songId) {
//   console.log("song id", songId );
//   if(songId) {
//     return new Promise( (resolve, reject) => {
//       $.ajax({
//         url: `${fbURL}/songs/${songId}.json`,
//         method: "DELETE"
//       }).done( () => {
//         resolve();
//       }).fail( (err) => {
//         reject(err);
//       });
//     });
//   } else {
//     console.log("Your song ID is not defined. Try again");
//   }
// }

// function getSong(songId) {
//   console.log("song id sent to getSong", songId );
//   return new Promise( ( resolve, reject) => {
//     $.ajax({
//       url: `${fbURL}/songs/${songId}.json`
//     }).done( (songData) => {
//       resolve(songData);
//     });
//   });
// }

function editMovie(movie, watchlistId) {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}/watchlist/${watchlistId}.json`,
      type: "PATCH",
      data: JSON.stringify(movie)
    }).done( (data) => {
      resolve(data);
    });
  });
}

// module.exports = {
//   getSongs,
//   getUserSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };
