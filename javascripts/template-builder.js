"use strict";

// let $ = require('jquery'),
let Handlebars = require('hbsfy/runtime');

let movieListTemplate = require('../templates/movie-list.hbs');
let ratingTemplate = require('../templates/rating.hbs');

Handlebars.registerPartial('rating', ratingTemplate);

module.exports.makeMovieList = (movieList) => {
  console.log("movielist", movieList);
  return movieListTemplate({movies: movieList});
};
