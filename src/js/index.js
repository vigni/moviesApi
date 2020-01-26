import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import "bootstrap/js/src/dropdown";

import getApiServices from "./services/getApiServices";
import { convertTime, feedDropDownYears } from "./services/helpers";
import { orderBy, getCheckbox } from "./services/orderBy";
import { displayLatestMovies, displayFavoritesMovies, searchMovie } from "./services/displayMovies";


const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";
const { getLatestMovies } = getApiServices(url, apiKey);

const loader = document.getElementsByClassName("section-loader");


export const removeLoader = () => {
  Object.keys(loader).forEach(elemKey => {
    if (loader[elemKey].classList.contains("active")) {
      loader[elemKey].classList.remove("active");
    }
  });
}

export const setLoader = () => {
  Object.keys(loader).forEach(elemKey => {

    if (loader[elemKey].classList.contains("active") == false) {
      loader[elemKey].classList.add("active");
    }
  });
}

window.changeContent = function (id) {
  const contentsToDisplay = document.getElementsByClassName("containerDisplay");
  const fav = document.getElementById("fav-menu");
  const home = document.getElementById("home-menu");

  if (id === "favoris") {
    fav.classList.add("active");
    home.classList.remove("active");
  }
  if (id === "home") {
    fav.classList.remove("active");
    home.classList.add("active");
    getLatestMovies("", "", results => {
      displayLatestMovies("", results.results);
    });
  }
  Object.keys(contentsToDisplay).forEach(elemKey => {
    contentsToDisplay[elemKey].classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
};

window.changeHeart = function (id) {
  const favoriteMovies = Object.keys(sessionStorage);
  const element = document.getElementById(id);
  const elementBis = document.getElementById(`${id}-detail`);

  if (favoriteMovies.includes(id.toString())) {
    element.classList.remove("fas");
    element.classList.add("far");
    if (elementBis != null) {
      elementBis.classList.remove("fas");
      elementBis.classList.add("far");
    }

    sessionStorage.removeItem(id);
  } else {
    if (elementBis != null) {
      elementBis.classList.remove("far");
      elementBis.classList.add("fas");
    }
    element.classList.remove("far");
    element.classList.add("fas");

    sessionStorage.setItem(id, id);
  }
};

window.deleteFromFavorite = function (id) {
  const favoriteMovies = Object.keys(sessionStorage);
  if (favoriteMovies.includes(id.toString())) {
    sessionStorage.removeItem(id);
  } else {
    sessionStorage.setItem(id, id);
  }
  displayFavoritesMovies(Object.keys(sessionStorage));
};

const removeTag = element => {
  if (element.getAttribute("id") === "cross-tag" || element.parentNode.getAttribute("id") === "cross-tag") {
    document.getElementById("tag").remove();
    orderBy(false)
  }
};

const displayTagToOrder = value => {
  document.getElementById("acteur").value = "";
  document.getElementById("acteur").placeholder = "";
  const tagElement = document.getElementById("tag-section");
  const tag = document.getElementById("tag");
  if (!isNaN(value)) {
    document.getElementById("acteur").placeholder = "Chaine attendu (ex: Omar Sy)";
  }
  // document.getElementById("acteur").placeholder = ""
  if (tag == null) {
    const newTag = document.createElement("span");
    newTag.id = "tag";
    newTag.innerHTML = `${value}<i class="fas fa-times" id="cross-tag"></i>`;
    tagElement.appendChild(newTag);
    orderBy(false);
  } else {
    tag.innerHTML = `${value}<i class="fas fa-times" id="cross-tag"></i>`;
    orderBy(false);
  }
};

//-------------
// First functions executed when the page has loaded
//-------------

feedDropDownYears();

getLatestMovies("", "", results => {
  displayLatestMovies("", results.results);
});

//-------------
// Event listener
//-------------

// reload page to display latest movies
const reload = document.getElementById("reload");
reload.addEventListener("click", event => {
  document.getElementById("title-home").innerHTML = "Les derniers films :";

  document.location.reload(true);
});

// when dropdown of year is change to filter by
const dropdownYear = document.getElementById("dropdown-years");
dropdownYear.addEventListener("change", () => {
  orderBy(false, "");
});

// when CLICK on kind checkbox to filter by
const kind = document.getElementById("kind");
kind.addEventListener("click", () => {
  let reset = false;
  if (getCheckbox() == "") {
    reset = true;
  }
  orderBy(reset, "")
});

// when enter is PRESS to filter by actor
const actorLabel = document.getElementById("acteur");
actorLabel.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    displayTagToOrder(actorLabel.value);
  }
});

// when CLICK on cross to remove actor tag
const actorSection = document.getElementById("actor-section");
actorSection.addEventListener("click", event => {
  removeTag(event.target);
});


//When rangeControl is change to filter by runtime
const timeRange = document.getElementById("formControlRange");
timeRange.addEventListener("change", () => {
  const range = document.getElementById("formControlRange");
  const label = document.getElementById("range-time");

  label.innerHTML = convertTime(range.value * 3);
  orderBy(false);
  
});

const displayArrow = () => {
  var scroll = window.scrollY;
  if (scroll <= document.getElementById("options").offsetTop) {
    document.getElementById("arrow-to-top").classList.remove("active");
  }
  if (scroll >= document.getElementById("options").offsetTop) {
    document.getElementById("arrow-to-top").classList.add("active");
  }
}
window.addEventListener("load", displayArrow);
window.addEventListener("resize", displayArrow);
window.addEventListener("scroll", displayArrow);

document.getElementById("favoris-menu").onclick = () => {
  displayFavoritesMovies(Object.keys(sessionStorage));
};

document.getElementById("search").onclick = () => {
  searchMovie();
};