import axios from "axios";
import { formatDateForApi } from "./helpers";

const getApiServices = (url, apiKey) => ({
  getOneMovie(idMovies, callback) {
    const request = axios.get(`${url}3/movie/${idMovies}?api_key=${apiKey}&language=fr-FR`);

    return request.then(({ data }) => callback(data));
  },

  getLatestMovies(year, types, callback) {
    const fullDate = formatDateForApi();

    const request = axios.get(
      `${url}3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${fullDate}&with_original_language=fr&with_genres=${types}&primary_release_year=${year}`
    );
    request.then(({ data }) => callback(data));
  }, 

  getPopularByYear(types, year, callback) {
    const request = axios.get(
      `${url}3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&with_genres=${types}`
    );
    request.then(({ data }) => callback(data));
  },

  getMoviesBySearch(search, callback) {
    const request = axios.get(
      `${url}3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`
    );
    request.then(({ data }) => callback(data));
  },

  getMoviesBySearchByTypes(types, search, callback) {
    const request = axios.get(
      `${url}3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false&with_genres=${types}`
    );
    request.then(({ data: results }) => callback(results));
  },

  getTypes(callback) {
    const request = axios.get(`${url}3/genre/movie/list?api_key=${apiKey}&language=fr-FR`);
    request.then(({ data }) => callback(data));
  },

  getSearchPeoples(search, callback) {
    const request = axios.get(
      `${url}3/search/person?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`
    );
    request.then(({ data }) => callback(data));
  }
});

export default getApiServices;
