"use strict";

let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider(),
    $ = require('jquery');

firebase.auth().onAuthStateChanged( (user) => {
  if(user) {
    $('#logout').removeClass("is-hidden");
    $('#auth-btn').addClass("is-hidden");
  } else {
    $('#logout').addClass("is-hidden");
    $('#auth-btn').removeClass("is-hidden");
  }
});

function logInGoogle() {
  console.log("wazzup, auth?");
  return firebase.auth().signInWithPopup(provider);
}

function logout() {
  console.log("logout clicked" );
  return firebase.auth().signOut();
}

function getUser() {
  // https://firebase.google.com/docs/auth/web/manage-users
  return firebase.auth().currentUser.uid;
}

module.exports = {logInGoogle, logout, getUser};
