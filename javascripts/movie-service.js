'use strict';

let $ = require('jquery');

function getCastDetails(queryUrl) {
  console.log("query URL", queryUrl);
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: queryUrl
    }).done( (movie) => {
      // console.log("movie", movie);
      resolve(movie);
    }).fail( (err) => {
      console.log("error getting details", err);
      reject(err);
    });
  });
}

module.exports.buildCastQueries = (moviesData) => {
  let castPromises = [];
  moviesData.forEach( (movie) => {
    let id = movie.movie_id || movie.id;
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e272e7240171b6fbdd25ad132e5e70b1`;
    castPromises.push(getCastDetails(url));
  });
  return Promise.all(castPromises);
};

module.exports.addCastList = (movies, casts) => {
  movies.forEach( (movie, index) => {
    if(casts[index].cast.length)
    movie.cast_list = casts[index].cast.slice(0,3);
  });
  return movies;
};
