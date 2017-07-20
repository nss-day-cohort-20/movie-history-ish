"use strict";

// remember to setup auth rules in your firebase project console
let firebase = require("firebase/app"),
    fbData = require("./fb-getter")();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: fbData.key,
  authDomain: fbData.authDomain
};

firebase.initializeApp(config);

module.exports = firebase;
