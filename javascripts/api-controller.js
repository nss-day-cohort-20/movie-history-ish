'use strict';

let $ = require('jquery');
let api = require('./movieAPI-factory');
let movieMaker = require('./movie-service');

module.exports.searchMovies = (userInput) => {
  return new Promise( (resolve, reject) => {
    api.getMovies(userInput)
    .then( (movies) => {
      let moviesArr = movies.slice(0,6);
      movieMaker.buildCastQueries(moviesArr)
      .then( (castArr) => {
        console.log("stuff", castArr);
        let amendedMovies = movieMaker.addCastList(moviesArr, castArr);
        console.log("amended list", amendedMovies);
        resolve(amendedMovies);
      });
    });
  });
};
