import getApiServices from "./getApiServices";
import { setLoader,removeLoader } from "../index";

import { generateCard, generateHtmlDetailsMovie } from "./generateHtml";
import { convertTime , sliceOverview } from "./helpers";

const url = "https://api.themoviedb.org/";
const apiKey = "f3644f42368c13e65beb101e19b5849d";

const { getOneMovie } = getApiServices(url, apiKey);
const { getMoviesBySearch } = getApiServices(url, apiKey);

export const displayLatestMovies = (time, results) => {
    let card = "";
    results.forEach(element => {
        getOneMovie(element.id, resp => {
            const runtime = convertTime(resp.runtime);
            const overview = sliceOverview(resp.overview);
            if (time !== "") {
                if (time > resp.runtime) {
                    card += generateCard(
                        resp.poster_path,
                        resp.title,
                        resp.id,
                        resp.release_date,
                        runtime,
                        overview,
                        resp.vote_average
                    );
                }
            }
            else {
                card += generateCard(
                    resp.poster_path,
                    resp.title,
                    resp.id,
                    resp.release_date,
                    runtime,
                    overview,
                    resp.vote_average
                );
            }
            document.getElementById("articles").innerHTML = card;
        });

    });
    removeLoader();
};

export const displayPeopleMovies = (types, results) => {
    let card = "";
    let actor;
    let title;

    results.forEach(element => {
        actor = element.name;

        element.known_for.forEach(elem => {
            getOneMovie(elem.id, resp => {
                const runtime = convertTime(resp.runtime);
                let overviewSlice = resp.overview;
                if (overviewSlice.length > 199) {
                    overviewSlice = `${resp.overview.slice(0, 80)}...`;
                }
                title = resp.title == undefined ? resp.original_name : resp.title;
                let genresMovie = [];
                resp.genres.forEach(genre => {
                    genresMovie.push(genre.name);
                });

                if (types != "") {
                    let compteur = 0;
                    types.forEach(type => {
                        if (genresMovie.includes(type.toString())) {
                            compteur = compteur + 1;
                        }
                    });
                    if (compteur == types.length) {
                        card += generateCard(
                            resp.poster_path,
                            title,
                            resp.id,
                            resp.release_date,
                            runtime,
                            overviewSlice,
                            resp.vote_average,
                            "",
                            actor
                        );
                    }


                } else {
                    card += generateCard(
                        resp.poster_path,
                        title,
                        resp.id,
                        resp.release_date,
                        runtime,
                        overviewSlice,
                        resp.vote_average,
                        "",
                        actor
                    );
                }


                document.getElementById("articles").innerHTML = card;
            });
        });
    });
    removeLoader();
};

export const displayFavoritesMovies = results => {
    let card = "";
    setLoader();
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
    removeLoader();
    document.getElementById("favoris-section").innerHTML = "Vous n'avez pas de favoris &#128577";
};

export const displaySearchMovies = results => {
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
    removeLoader();
    document.getElementById("articles").innerHTML = "Aucun résultat";
};

window.viewMore = function (id) {
    let card = "";
    getOneMovie(id, resp => {
        const runtime = convertTime(resp.runtime);
        const overviewSlice = resp.overview;
        const vote_average = `${resp.vote_average * 10}%`;
        let nameGenres = "";
        resp.genres.forEach(function (genre) {
            nameGenres += `- ${genre.name} `;
        });
        let nameCountries = "";
        resp.spoken_languages.forEach(function (country) {
            nameCountries += `- ${country.name} `;
        });
        let prods = "";
        resp.production_companies.forEach(function (prod) {
            prods += `- ${prod.name} `;
        });
        const budget = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(resp.budget)
        const revenue = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(resp.revenue)
        card += generateHtmlDetailsMovie(
            resp.poster_path,
            resp.title,
            resp.release_date,
            runtime,
            overviewSlice,
            vote_average,
            nameGenres.substr(1),
            budget,
            nameCountries.substr(1),
            id,
            prods.substr(1),
            revenue
        );
        document.getElementById("title-detail").innerHTML = `Détails : ${resp.title}`;
        document.getElementById("detail-container").innerHTML = card;
    });

    window.changeContent("detail");
};

export const searchMovie = () => {

    if (
        document.getElementById("favoris").classList.contains("active") ||
        document.getElementById("detail").classList.contains("active")
    ) {
        window.changeContent("home");
    }
    const value = document.getElementById("searchBar").value;
    if (value !== "") {
        document.getElementById("options").style.display = "none";
        // document.getElementById("options").style.display = "none";
        document.getElementById("title-home").classList.remove("active");
        document.getElementById("title-search").innerHTML = `Recherche : "${value}"`;
        document.getElementById("title-search").classList.add("active");
        setLoader();
        getMoviesBySearch(value, results => {
            displaySearchMovies(results.results);
        });
    } else {
        document.getElementById("options").style.display = "flex";
        document.getElementById("title-home").classList.add("active");
        document.getElementById("title-search").classList.remove("active");
        setLoader();
        getLatestMovies("", "", results => {
            displayLatestMovies("", results.results);
        });
    }
};