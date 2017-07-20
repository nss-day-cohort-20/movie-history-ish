// interactions with the movie API
'use strict';
let $ = require('jquery');

module.exports.getMovies = () => {
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=e272e7240171b6fbdd25ad132e5e70b1&query=evil"
    }).done( (data) => {
      console.log("data", data);
      let moviesArr = data.results.slice(0,9);
      buildCastQueries(moviesArr)
      .then( (castArr) => {
        console.log("stuff", castArr);
        let amendedMovies = addCastList(moviesArr, castArr);
        console.log("amended list", amendedMovies);
        resolve(amendedMovies);
      });
    });
  });
};

function buildCastQueries(moviesData) {
  let castPromises = [];
  moviesData.forEach( (movie) => {
    let url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=e272e7240171b6fbdd25ad132e5e70b1`;
    castPromises.push(getCastDetails(url));
  });
  return Promise.all(castPromises);
}

function getCastDetails(queryUrl) {
  // console.log("query URL", queryUrl);
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

function addCastList(movies, casts) {
  movies.forEach( (movie, index) => {
    movie.cast_list = casts[index].cast.slice(0,3);
  });
  return movies;
}
