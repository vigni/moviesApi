const apiKey = "f3644f42368c13e65beb101e19b5849d";


const getMoviesByKeyword = (search) => {

    const { data } = await request;

    const results = (url) => (search ,callback) =>{
        const request = axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1`);
            request.then(({data}) => callback(data));
    }

    console.log(results);
};


const getLatestMovies = () => {

    const { data } = await request;

    const results = (url) => (search ,callback) =>{
        const request = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=1`);
        request.then(({data}) => callback(data));
    }
    console.log(results);
};

const addMoviesToFavorites = () => {

    const { data } = await request;

    const results = (url) => (search ,callback) =>{
        const request = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&page=1`);
        request.then(({data}) => callback(data));
    }
    console.log(results);
};



// GET collection of movie by keyword (searchbar)
//https://developers.themoviedb.org/3/search/search-movies


// GET latest movies (default home)
//https://developers.themoviedb.org/3/discover/movie-discover


// POST rating one movie
//https://developers.themoviedb.org/3/movies/rate-movie
// https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>

