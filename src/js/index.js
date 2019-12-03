import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import "bootstrap/js/src/dropdown";

import getApiServices from "./services/getApiServices";
import { convertTime, generateCard } from "./services/helpers";

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

getLatestMovies(results => {
  displayLatestMovies(results.results);
});

// Ajoute la classe active au contenue "filter" et bouton "filter" etenleve active à ceux de "order"
// function activeFilter() {
//   document.getElementById("btn-filter").classList.add("active");
//   document.getElementById("btn-order").classList.remove("active");
//   document.getElementById("body-filter").classList.add("active");
//   document.getElementById("body-order").classList.remove("active");
// }
// Ajoute la classe active au contenue "order" et bouton "order" et enleve active à ceux de "filter"

// function activeOrder() {
//   document.getElementById("btn-filter").classList.remove("active");
//   document.getElementById("btn-order").classList.add("active");
//   document.getElementById("body-filter").classList.remove("active");
//   document.getElementById("body-order").classList.add("active");
// }
// Lors du clique sur le bouton filter ou trier
// document.getElementById("btn-filter").onclick = () => {
//   activeFilter();
// };

// document.getElementById("btn-order").onclick = () => {
//   activeOrder();
// };

// document.getElementById("search").onclick = () => {
//   const valueSearch = document.getElementById("searchBar").value;
//   if (valueSearch !== "") {
//     getMoviesBySearch(valueSearch, results => {
//       displaySearchMovies(results.results);
//     });
//   } else {
//     getLatestMovies(results => {
//       displayLatestMovies(results.results);
//     });
//   }
// };
window.viewMore = function() {
  alert("NTM");
};

function searchFilm(value) {
  if (value !== "") {
    getMoviesBySearch(value, results => {
      displaySearchMovies(results.results);
    });
  } else {
    getLatestMovies(results => {
      displayLatestMovies(results.results);
    });
  }
}

document.getElementById("search").onclick = () => {
  const valueSearch = document.getElementById("searchBar").value;

  searchFilm(valueSearch);
};
