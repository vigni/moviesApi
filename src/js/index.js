import axios from "axios";

// import {$,jQuery} from 'jquery';
// window.$ = $;
// window.jQuery = jQuery;

import "../scss/main.scss";
import {directive} from "@babel/types";

//functions service
// import getLatestMovies from "./services/searchApi";
import getOneMovie from "./services/searchApi";
import getLatestMovies from "./services/searchApi";




const recentMovies = getLatestMovies();

recentMovies("", results => {

    const generateTree = () => {
        let html ="";
        
        results.results.map((element) => {

            const oneMovie = getOneMovie(element.id);
            oneMovie("", resp =>{
                console.log(resp);
            });

            var date = element.release_date.split('-');
            var new_date=  date[2] + '-' + date[1] + '-' + date[0];

            html += '<div class="card">';
                html += '<div class="row no-gutters">';
                    html += '<div class="col-md-4">';
                        html += '<img  height="250px" id="picture" src="' + 'https://image.tmdb.org/t/p/original/' + element.poster_path + '" class="card-img">';
                    html += '</div>'
                    html += '<div class="col-md-8">'
                        html += '<div class="card-body">';
                            html += '<h5 class="card-title">' + element.title + '</h5>'
                            html += '<p class="card-text"><small class="text-muted">'+ new_date +'</small></p>'

                            html += '<div class="button-section"> <button type="button" class="btn plus">Voir plus ></button></div>'
                            html += '</div>'
                    html += '</div>'
                html += '</div>'
            html += '</div>'
        });
        return html;
    };
    
    document.getElementById("articles").innerHTML = generateTree();
})


// Lors du clique sur le bouton filter ou trier
document.getElementById("btn-filter").onclick = function() {activeFilter()};
document.getElementById("btn-order").onclick = function() {activeOrder()};

// Ajoute la classe active au contenue "filter" et bouton "filter" et enleve active à ceux de "order"
function activeFilter() {
    document.getElementById("btn-filter").classList.add('active');
    document.getElementById("btn-order").classList.remove('active');
    document.getElementById("body-filter").classList.add('active');
    document.getElementById("body-order").classList.remove('active');
}
// Ajoute la classe active au contenue "order" et bouton "order" et enleve active à ceux de "filter"

function activeOrder() {
    document.getElementById("btn-filter").classList.remove('active');
    document.getElementById("btn-order").classList.add('active');
    document.getElementById("body-filter").classList.remove('active');
    document.getElementById("body-order").classList.add('active');
}



// $('.starrr').starrr();




