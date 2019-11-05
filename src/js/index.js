import Axios from "axios";
import "../scss/main.scss";
import "./services/searchApi.js";

const latestMovies = getLatestMovies();
console.log(latestMovies);

document.getElementById('output').innerHTML = location.search;
$(".chosen-select").chosen();


document.getElementById("app").innerHTML = "";
