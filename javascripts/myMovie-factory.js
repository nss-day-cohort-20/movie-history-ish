"use strict";

let $ = require('jquery'),
    fbURL = "https://fir-101-6198a.firebaseio.com",
    firebase = require('./firebaseConfig');

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs() {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/songs.json`//<.json is important!
    }).done( (songData) => {
      console.log("songData", songData );
      resolve(songData);
    });
  });
}

// get user's songs
// use query with orderBy= user id and equalTo the current user
function getUserSongs() {
  let currentUser = firebase.auth().currentUser.uid;
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/songs.json?orderBy="uid"&equalTo="${currentUser}"`//<.json is important!
    }).done( (UsersongData) => {
      console.log("songData", UsersongData );
      resolve(UsersongData);
    });
  });
}

function addSong(songFormObj) {
  return new Promise( (resolve, reject) => {
    let currentUser = firebase.auth().currentUser.uid;
    songFormObj.uid = currentUser;
    $.ajax({
      url: `${fbURL}/songs.json`,
      type: "POST",
      data: JSON.stringify(songFormObj),
      dataType: "json"
    }).done( (songId) => {
      resolve(songId);
    });
  });
}

function deleteSong(songId) {
  console.log("song id", songId );
  if(songId) {
    return new Promise( (resolve, reject) => {
      $.ajax({
        url: `${fbURL}/songs/${songId}.json`,
        method: "DELETE"
      }).done( () => {
        resolve();
      }).fail( (err) => {
        reject(err);
      });
    });
  } else {
    console.log("Your song ID is not defined. Try again");
  }
}

function getSong(songId) {
  console.log("song id sent to getSong", songId );
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${fbURL}/songs/${songId}.json`
    }).done( (songData) => {
      resolve(songData);
    });
  });
}

function editSong(songFormObj, songId) {
  console.log("songId in EditSong", songId );
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `${fbURL}/songs/${songId}.json`,
      type: "PUT",
      data: JSON.stringify(songFormObj)
    }).done( (data) => {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  getUserSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};

// ****************************************
// DB interaction using Firebase SDK
// ****************************************

// function getSongs(callback) {
//   firebase.database().ref('songs').on('value', function(songData) {
//     console.log("Sumthin happened");
//     callback(songData.val());
//   });
// }

// function addSong(newSong) {
//   console.log("new song", newSong );
//   return firebase.database().ref('songs').push(newSong);
// }

// function deleteSong(songId) {
//   return firebase.database().ref(`songs/${songId}`).remove();
// }

// function getSong(songId) {
//   console.log("song id", songId );
//   return firebase.database().ref(`songs/${songId}`).once('value');
// }

// function editSong(songFormObj, songId) {
//   console.log("songId in EditSong", songId );
//   return firebase.database().ref(`songs/${songId}`).update(songFormObj);
// }

// module.exports = {
//   getSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };
