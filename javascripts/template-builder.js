"use strict";

let $ = require('jquery');
// let formTemplate = require('../templates/form.hbs');
let movieListTemplate = require('../templates/movie-list.hbs');

module.exports.makeMovieList = (movieList) => {
  console.log("movielist", movieList);
  return movieListTemplate({movies: movieList});
};
