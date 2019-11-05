import Axios from "axios";
import "../scss/main.scss";
import "./services/searchApi.js";

const latestMovies = getLatestMovies();
console.log(latestMovies);

$('#btn-order').click(function(){
    $(this).removeClass('active');
    $('#btn-filter').addClass('active');

});

document.getElementById("app").innerHTML = "";
