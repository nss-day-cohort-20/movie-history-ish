"use strict";

let $ = require('jquery'),
    firebase = require('./firebaseConfig'),
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

// function editSong(songFormObj, songId) {
//   console.log("songId in EditSong", songId );
//   return new Promise( (resolve, reject) => {
//     $.ajax({
//       url: `${fbURL}/songs/${songId}.json`,
//       type: "PUT",
//       data: JSON.stringify(songFormObj)
//     }).done( (data) => {
//       resolve(data);
//     });
//   });
// }

// module.exports = {
//   getSongs,
//   getUserSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };
