"use strict";

let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider();

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
