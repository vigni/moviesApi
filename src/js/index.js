import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import "bootstrap/js/src/dropdown";

import getApiServices from "./services/getApiServices";
import { convertTime, generateCard, generateHtmlDetailMovie } from "./services/helpers";

const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";

const { getLatestMovies } = getApiServices(url, apiKey);
const { getOneMovie } = getApiServices(url, apiKey);
const { getMoviesBySearch } = getApiServices(url, apiKey);

const displayLatestMovies = results => {
  let card = "";
  results.forEach(element => {
    getOneMovie(element.id, resp => {
      const runtime = convertTime(resp.runtime);
      let overviewSlice = element.overview;
      if (overviewSlice.length > 199) {
        overviewSlice = `${element.overview.slice(0, 80)}...`;
      }
      card += generateCard(
        resp.poster_path,
        resp.title,
        resp.id,
        resp.release_date,
        runtime,
        overviewSlice,
        resp.vote_average
      );

      document.getElementById("articles").innerHTML = card;
    });
  });
};

const displaySearchMovies = results => {
  let card = "";
  if (results != "") {
    results.forEach(element => {
      getOneMovie(element.id, resp => {
        const runtime = convertTime(resp.runtime);
        let overviewSlice = element.overview;
        if (overviewSlice.length > 199) {
          overviewSlice = `${element.overview.slice(0, 80)}...`;
        }
        card += generateCard(
          resp.poster_path,
          resp.title,
          resp.id,
          resp.release_date,
          runtime,
          overviewSlice,
          resp.vote_average
        );

        document.getElementById("articles").innerHTML = card;
      });
    });
  }
  document.getElementById("articles").innerHTML = 'Aucun résultat';
};

getLatestMovies(results => {
  displayLatestMovies(results.results);
});

window.viewMore = function(id) {
  let card = "";
  getOneMovie(id, resp => {
    const runtime = convertTime(resp.runtime);
    let overviewSlice = resp.overview;
    
    console.log(resp);
    card += generateHtmlDetailMovie(
      resp.poster_path,
      resp.title,
      resp.release_date,
      runtime,
      overviewSlice,
      resp.vote_average,
      resp.genres,
      resp.budget,
      resp.spoken_languages
    );
    document.getElementById('title-detail').innerHTML = `Détails : ${resp.title}`;
    document.getElementById("detail-content").innerHTML = card;
  });

  document.getElementById('home').classList.remove('active');
  document.getElementById('detail').classList.add('active');

};




function searchFilm(value) {
  if (value !== "") {
    document.getElementById('title-home').classList.remove('active');
    document.getElementById('title-search').innerHTML = `Recherche : "${value}"`;
    document.getElementById('title-search').classList.add('active');
    
    getMoviesBySearch(value, results => {
      displaySearchMovies(results.results);
    });
  } else {
    document.getElementById('title-home').classList.add('active');
    document.getElementById('title-search').classList.remove('active');
    getLatestMovies(results => {
      displayLatestMovies(results.results);
    });
  }
}

// document.getElementById("remove-icone").onclick = () => {
//   console.log('ffdsfdsf')
//   const valueSearch = document.getElementById("searchBar").value;
//   console.log(valueSearch);
// };

document.getElementById("search").onclick = () => {
  const valueSearch = document.getElementById("searchBar").value;
  searchFilm(valueSearch);
};



