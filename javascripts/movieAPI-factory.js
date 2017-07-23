// interactions with the movie API
'use strict';
let $ = require('jquery');

module.exports.getMovies = (userInput) => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=e272e7240171b6fbdd25ad132e5e70b1&query=${userInput}`
    }).done( (data) => {
      console.log("data", data);
      resolve(data.results);
    });
  });
};


