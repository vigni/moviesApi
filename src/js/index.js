import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import posterIfNull from "../img/film.jpg";
// import starsYellow from "../img/stars.png";
// import starsGrey from "../img/starsGrey.png";

import getApiServices from "./services/getApiServices";
import { convertTime } from "./services/helpers";

const url = "https://api.themoviedb.org/";
const urlPictureApi = "https://image.tmdb.org/t/p/original/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";
const { getLatestMovies } = getApiServices(url, apiKey);
const { getOneMovie } = getApiServices(url, apiKey);

const generateCard = (poster, title, id, date, runtime, overview, average) => {
  const datefr = new Date(date);
  const posterUrl = urlPictureApi + poster;
  let html = "";
  html = `
      <div>
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img  height="250px" id="picture" src="${poster === null ? posterIfNull : posterUrl}" class="card-img">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="favoris">
                    <h5 class="card-title">${title}</h5>
                    <div
                      id="${id}"
                      onClick="sessionStorage.setItem(id, id)"
                    >
                      <i style="color: red;" class="far fa-heart"></i>
                    </div>
                  </div>
                  <p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${`${datefr.getDate()}/${datefr.getMonth()}/${datefr.getFullYear()} <span class="sep-date">|</span> ${runtime} `} </small></p>

                  <p class="card-text">${overview}</p>
                  
                  <div class="container-stars">
                    <div class="stars-grey">
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div class="stars-yellow">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                  <button class="btn"> Voir plus ></button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

  return html;
};

const displayLatestMovies = results => {
  let card = "";
  results.forEach(element => {
    getOneMovie(element.id, resp => {
      // console.log(convertTime(resp.runtime));
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
function activeFilter() {
  document.getElementById("btn-filter").classList.add("active");
  document.getElementById("btn-order").classList.remove("active");
  document.getElementById("body-filter").classList.add("active");
  document.getElementById("body-order").classList.remove("active");
}
// Ajoute la classe active au contenue "order" et bouton "order" et enleve active à ceux de "filter"

function activeOrder() {
  document.getElementById("btn-filter").classList.remove("active");
  document.getElementById("btn-order").classList.add("active");
  document.getElementById("body-filter").classList.remove("active");
  document.getElementById("body-order").classList.add("active");
}
// Lors du clique sur le bouton filter ou trier
document.getElementById("btn-filter").onclick = () => {
  activeFilter();
};

document.getElementById("btn-order").onclick = () => {
  activeOrder();
};

document.getElementById("search").onclick = () => {
  searchMovies();
};
