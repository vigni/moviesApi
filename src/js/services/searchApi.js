import Axios from "axios";

const apiKey = "f3644f42368c13e65beb101e19b5849d";

const getMoviesByKeyword = () => (search ,callback) =>{
    const request = axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1`);
    request.then(({data}) => callback(data));   
}

    const getLatestMovies = () => (callback) =>{
        const request = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=1`);
        request.then(({data}) => callback(data));
    }


    const addMoviesToFavorites = () => (callback) =>{
        const request = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=1`);
        request.then(({data}) => callback(data));
    }


export default searchApi;

// GET collection of movie by keyword (searchbar)
//https://developers.themoviedb.org/3/search/search-movies


// GET latest movies (default home)
//https://developers.themoviedb.org/3/discover/movie-discover


// POST rating one movie
//https://developers.themoviedb.org/3/movies/rate-movie
// https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>

