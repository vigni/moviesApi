import axios from "axios";
const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";

const getOneMovie = (idMovies) => (idMovies, callback) =>{
    const request = axios.get(`${url}3/movie/${idMovies}?api_key=${apiKey}=&language=fr-FR`);
    
    request.then(({data}) => callback(data) );
}

const getLatestMovies = () => (search, callback) =>{
    const request = axios.get(`${url}3/discover/movie?&api_key=${apiKey}&language=fr-FR&page=1`);

    request.then(({data}) => callback(data) );
}

const getDetailsMovie = (idMovies) => (idMovies, callback) =>{
    const request = axios.get(`${url}3/discover/movie?&api_key=${apiKey}&language=fr-FR&page=1`);

    request.then(({data}) => callback(data) );
}
    // const addMoviesToFavorites = () => (callback) =>{
    //     const request = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=1`);
    //     request.then(({data}) => callback(data));
    // }

export default  getLatestMovies ;
export { getOneMovie };
export { getDetailsMovie };

// export default getOneMovie;
// GET collection of movie by keyword (searchbar)
//https://developers.themoviedb.org/3/search/search-movies


// GET latest movies (default home)
//https://developers.themoviedb.org/3/discover/movie-discover


// POST rating one movie
//https://developers.themoviedb.org/3/movies/rate-movie
// https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>
