import axios from "axios";

const getApiServices = (url, apiKey) => ({
  getOneMovie(idMovies, callback) {
    const request = axios.get(`${url}3/movie/${idMovies}?api_key=${apiKey}&language=fr-FR`);

    return request.then(({ data }) => callback(data));
  },

  getLatestMovies(callback) {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    const request = axios.get(
      `${url}3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${fullDate}&with_original_language=fr`
    );

    request.then(({ data: results }) => callback(results));
  },
  
  getMoviesBySearch(search, callback) {
    const request = axios.get(
      `${url}3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`
      );
    request.then(({ data }) => callback(data));
  }
});

export default getApiServices;
