import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";

import getApiServices from "./services/getApiServices";

const url = "https://api.themoviedb.org/";
const urlPictureApi = "https://image.tmdb.org/t/p/original/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";
const { getLatestMovies } = getApiServices(url, apiKey);
const { getOneMovie } = getApiServices(url, apiKey);

const convertTime = num => {
  const hours = num / 60;
  const minutes = num % 60;
  // if (minutes < 10) {
  //   minutes = "0" + minutes.toString();
  // }
  return `${hours}h${minutes}`;
};

const generateHtml = (results, urlPicture) => {
  let html = "";

  results.forEach(element => {
    let time = getOneMovie(element.id, resp => {
      // console.log(convertTime(resp.runtime));
      time += convertTime(resp.runtime);
    });

    console.log(element);
    const date = new Date(element.release_date);

    let { overview } = element;
    // console.log(overview.length);
    if (overview.length > 199) {
      overview = `${element.overview.slice(0, 80)}...`;
    }

    html += `
      <div>
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img  height="250px" id="picture" src="${urlPicture + element.poster_path}" class="card-img">
            </div>

            <div class="col-md-8">
              <div class="card-body">
                <div class="favoris">
                  <h5 class="card-title">${element.title}</h5>
                  <div
                    id="${element.id}"
                    onClick="sessionStorage.setItem(id, id)"
                  >
                    <i style="color: red;" class="fas fa-heart"></i>
                  </div>
                </div>
                <p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} | ${time} `} </small></p>

                <p class="card-text">${overview}</p>
                <p class="card-text">${element.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });

  return html;
};

getLatestMovies(results => {
  document.getElementById("articles").innerHTML = generateHtml(results.results, urlPictureApi);
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
