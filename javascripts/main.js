"use strict";

// Pulling in jQuery via a CDN because of the star-rating plugin I'm using.
// Not happy about it, so a refactor would include dumping the plugin and
// rolling my own star-rating logic
// let $ = require('jquery'),
let movieCtrl = require('./movie-ctrl');

// You can 'activate' a module just by calling 'require()' as long as there are no
// properties you're exporting from that module. These modules only contain
// listeners and helper functions that the listeners call, so we don't need to import
// anything to run inside this module. But requiring them all here, from a central spot, allows Browserify
// to know where to start creating the chain of dependencies.
require('./search');
require('./user-controller');

// Another way to write this file is to have each module's event listeners wrapped in
// a single function that activates all of them when that function is called. It's a little
// less weird than just calling 'require()' on a module. It's your choice
movieCtrl.attachEvents();
