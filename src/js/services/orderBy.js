import getApiServices from "./getApiServices";
import { setLoader } from "../index";
import { displayPeopleMovies, displayLatestMovies } from "./displayMovies";

const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";
const { getTypes } = getApiServices(url, apiKey);
const { getSearchPeoples } = getApiServices(url, apiKey);
const { getPopularByYear } = getApiServices(url, apiKey);

export const getCheckbox = () => {
    let nameChecked = [];
    const checkbox = document.getElementsByClassName("checkbox");
    for (let index = 0; index < checkbox.length; index++) {
        if (checkbox[index].checked === true) {
            nameChecked.push(checkbox[index].getAttribute("id"));
        }
    }

    return nameChecked;
};
export const orderBy = (reset) => {
    let idChecked = "";
    const titleHome = document.getElementById("title-home");
    let actorName;
    const year = document.getElementById("dropdown-years").value;
    const nameChecked = getCheckbox();
    let actor = "";
    const range = document.getElementById("formControlRange");
    const label = document.getElementById("range-time").textContent;
    document.getElementById("title-home").innerHTML = "Trier par :";

    if (document.getElementById("tag")) {
        actor = document.getElementById("tag").textContent.replace(" ", "%20");

    }

    if (nameChecked.length !== 0) {
        getTypes(results => {
            results.genres.forEach(element => {
                if (nameChecked.indexOf(element.name) != "-1") {
                    idChecked += `%2C${element.id}`;
                }
            });
            if (titleHome.classList.contains("active")) {
                idChecked = idChecked.substr(3);
                if (actor !== "") {
                    getSearchPeoples(actor, results => {
                        if (results.total_results === 0) {
                            document.getElementById("acteur").placeholder = "Acteur introuvable";
                        } else {
                            if (actor.includes("%20")) {
                                actorName = actor.replace("%20", " ");
                                titleHome.innerHTML = `Trier par acteur : ${actorName}`;
                            } else {
                                titleHome.innerHTML = `Trier par acteur : ${actor}`;
                            }
                            displayPeopleMovies(nameChecked, results.results);
                        }
                    });
                }
                else if (label !== "") {
                    setLoader();
                    getPopularByYear(idChecked, year, results => {
                        displayLatestMovies((range.value * 3), results.results);
                    });
                }
                else {
                    setLoader();
                    getPopularByYear(idChecked, year, results => {
                        displayLatestMovies("", results.results);
                    });
                }
            }
        });
    }

    else if (reset) {
        if (actor !== "") {
            setLoader();
            getSearchPeoples(actor, results => {
                if (results.total_results === 0) {
                    document.getElementById("acteur").placeholder = "Acteur introuvable";
                } else {
                    if (actor.includes("%20")) {
                        actorName = actor.replace("%20", " ");
                        titleHome.innerHTML = `Trier par acteur : ${actorName}`;
                    } else {
                        titleHome.innerHTML = `Trier par acteur : ${actor}`;
                    }

                    displayPeopleMovies("", results.results);
                }
            });
        }
        else {
            setLoader();
            getPopularByYear("", year, results => {
                displayLatestMovies("", results.results);
            });
        }

    }

    else if (actor !== "" && year !== "") {
        setLoader();
        getSearchPeoples(actor, results => {
            if (results.total_results === 0) {
                document.getElementById("acteur").placeholder = "Acteur introuvable";
            } else {
                if (actor.includes("%20")) {
                    actorName = actor.replace("%20", " ");
                    titleHome.innerHTML = `Trier par acteur : ${actorName}`;
                } else {
                    titleHome.innerHTML = `Trier par acteur : ${actor}`;
                }
                displayPeopleMovies("", results.results);
            }
        });
    }

    else if (label !== "") {
        setLoader();
        getPopularByYear("", year, results => {
            displayLatestMovies((range.value * 3), results.results);
        });
    }

    else if (year !== "") {
        getPopularByYear("", year, results => {
            displayLatestMovies("", results.results);
        });
    }
};