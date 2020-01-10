import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import "bootstrap/js/src/dropdown";

import getApiServices from "./services/getApiServices";
import { convertTime, generateCard, generateHtmlDetailsMovie } from "./services/helpers";

const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";

const { getLatestMovies } = getApiServices(url, apiKey);
const { getOneMovie } = getApiServices(url, apiKey);
const { getMoviesBySearch } = getApiServices(url, apiKey);
const { getTypes } = getApiServices(url, apiKey);
const { getSearchPeoples } = getApiServices(url, apiKey);
const { getMoviesBySearchByTypes } = getApiServices(url, apiKey);

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


const displayFavoritesMovies = results => {
  let card = "";
  if (results !== "") {
    results.forEach(element => {
      getOneMovie(element, resp => {
        const runtime = convertTime(resp.runtime);
        let overviewSlice = resp.overview;
        if (overviewSlice.length > 199) {
          overviewSlice = `${resp.overview.slice(0, 80)}...`;
        }
        card += generateCard(
          resp.poster_path,
          resp.title,
          resp.id,
          resp.release_date,
          runtime,
          overviewSlice,
          resp.vote_average,
          "favorite"
        );
        document.getElementById("favoris-section").innerHTML = card;
      });
    });
    document.getElementById("title-favoris").innerHTML = `Vos films favoris :`;
    window.changeContent("favoris");
  }
  document.getElementById("favoris-section").innerHTML = "Vous n'avez pas de favoris &#128577";
};

const displaySearchMovies = results => {
  let card = "";
  if (results !== "") {
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
  document.getElementById("articles").innerHTML = "Aucun résultat";
};

getLatestMovies('', results => {
  displayLatestMovies(results.results);
});

window.changeContent = function (id) {
  const contentsToDisplay = document.getElementsByClassName("containerDisplay");
  Object.keys(contentsToDisplay).forEach(elemKey => {
    contentsToDisplay[elemKey].classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
};

window.viewMore = function (id) {
  let card = "";
  getOneMovie(id, resp => {
    const runtime = convertTime(resp.runtime);
    const overviewSlice = resp.overview;

    card += generateHtmlDetailsMovie(
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
    document.getElementById("title-detail").innerHTML = `Détails : ${resp.title}`;
    document.getElementById("detail-container").innerHTML = card;
  });

  window.changeContent("detail");
};

const searchMovie = () => {
  if (document.getElementById("favoris").classList.contains("active") || document.getElementById("detail").classList.contains("active")) {
    window.changeContent("home");
  }
  const value = document.getElementById("searchBar").value;
  if (value !== "") {
    document.getElementById("title-home").classList.remove("active");
    document.getElementById("title-search").innerHTML = `Recherche : "${value}"`;
    document.getElementById("title-search").classList.add("active");

    getMoviesBySearch(value, results => {
      displaySearchMovies(results.results);
    });
  } else {
    document.getElementById("title-home").classList.add("active");
    document.getElementById("title-search").classList.remove("active");
    getLatestMovies('', results => {
      displayLatestMovies(results.results);
    });
  }

};

window.changeHeart = function (id) {
  const favoriteMovies = Object.keys(sessionStorage);
  const element = document.getElementById(id);
  if (favoriteMovies.includes(id.toString())) {
    element.classList.remove("fas");
    element.classList.add("far");
    sessionStorage.removeItem(id);
  } else {
    element.classList.remove("far");
    element.classList.add("fas");
    sessionStorage.setItem(id, id);
  }
};
window.deleteFavorite = function (id) {
  const favoriteMovies = Object.keys(sessionStorage);
  const element = document.getElementById(id);
  if (favoriteMovies.includes(id.toString())) {
    sessionStorage.removeItem(id);
  } else {
    sessionStorage.setItem(id, id);
  }
  displayFavoritesMovies(Object.keys(sessionStorage))
};



document.getElementById("search").onclick = () => {
  searchMovie();
};

document.getElementById("favoris-menu").onclick = () => {
  displayFavoritesMovies(Object.keys(sessionStorage));
};

const getCheckbox = () => {
  let nameChecked = [];
  const checkbox = document.getElementsByClassName("checkbox");
  for (let index = 0; index < checkbox.length; index++) {
    if (checkbox[index].checked == true) {
      nameChecked.push(checkbox[index].getAttribute('id'));
    }
  }

  return nameChecked;
}
const orderBy = (yearsSpan, actor) => {
  let nameChecked = getCheckbox();
  let idChecked = "";
  const titleHome = document.getElementById("title-home");

  let years = [];


  if (nameChecked.length != 0 && actor != undefined) {
    console.log("ffqs")
  }
  if (actor != undefined) {
    getSearchPeoples(actor, results => {
      if(results.total_results === 0)
      {
        document.getElementById("acteur").placeholder = "Introuvable";
        removeTag(document.getElementById("tag"))
      }
      
      displayLatestMovies(results.results[0].known_for)
    })
  }
  else {
    getTypes(results => {
      results.genres.forEach(element => {

        if (nameChecked.indexOf(element.name) != "-1") {
          idChecked += `%2C${element.id}`
        }

      })
      if (titleHome.classList.contains("active")) {
        if (idChecked != "") {
          idChecked = idChecked.substr(3)
          getLatestMovies(idChecked, results => {
            displayLatestMovies(results.results)
          })
        }
        else {
          getLatestMovies('', results => {
            displayLatestMovies(results.results)
          })
        }
      }
      // if (titleSearch.classList.contains("active")) {
      //   const value = document.getElementById("searchBar").value;
      //   if (idChecked != "") {

      //     getMoviesBySearchByTypes(idChecked, value, results => {
      //       displaySearchMovies(results.results);
      //     });
      //   }
      //   else {
      //     getMoviesBySearch(value, results => {
      //       displaySearchMovies(results.results);
      //     });
      //   }
      // }
    })
  }

  if (yearsSpan != undefined) {
    if (yearsSpan.length > 0) {
      Object.keys(yearsSpan).forEach(elem => {
        years.push(yearsSpan[elem].textContent)
      });
    }
  }


}

window.removeTag = function (element) {
  element.parentNode.remove();
}

window.displayActors = function (value) {
  document.getElementById("acteur").value = "";
  document.getElementById("acteur").placeholder= "";
  const tagElement = document.getElementById("tag-section");

  const tag = document.getElementById("tag");
  console.log(!isNaN(value))
  if (!isNaN(value)) {

    document.getElementById("acteur").placeholder = "Chaine attendu (ex: Omar Sy)"

  }
  else {
    // document.getElementById("acteur").placeholder = ""
    if (tag == null){
      const newTag = document.createElement("span");
      newTag.id = "tag";
      newTag.innerHTML = `${value}<i class="fas fa-times" onClick="removeTag(this)"></i>`;
      tagElement.appendChild(newTag);
  
      let actor = value.replace(" ", "%20")

      orderBy("", actor)
    }
    else{
      tag.innerHTML = `${value}<i class="fas fa-times" onClick="removeTag(this)"></i>`;
      let actor = value.replace(" ", "%20")
      console.log(actor)
      orderBy("", actor)
    }
    

    
  }

}

const kind = document.getElementById("kind");
kind.addEventListener("click", () => orderBy())



// const whenScrollIsAtBottom = callback => {
//   let canRun = true;

//   window.addEventListener(
//     "scroll",
//     () => {
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight &&
//         typeof callback === "function" &&
//         canRun
//       ) {
//         callback();
//         canRun = false;

//         setTimeout(() => {
//           canRun = true;
//         }, 1000);
//       }
//     },
//     false
//   );
// };

// whenScrollIsAtBottom(loadMore);