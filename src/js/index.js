import axios from "axios";
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

            // const oneMovie = getOneMovie(element.id);
            // oneMovie("", results =>{
            //     console.log(results.results);
            // });

            var date = element.release_date.split('-');
            var new_date=  date[2] + '-' + date[1] + '-' + date[0];

            html += '<div class="card">';
                html += '<div class="row no-gutters">';
                    html += '<div class="col-md-4">';
                        html += '<img width="100px" height="200px" id="picture" src="' + 'https://image.tmdb.org/t/p/original/' + element.poster_path + '" class="card-img">';
                    html += '</div>'
                    html += '<div class="col-md-8">'
                        html += '<div class="card-body">';
                            html += '<h5 class="card-title">' + element.title + '</h5>'
                            html += '<p class="card-text"><small class="text-muted">'+ new_date +'</small></p>'
                            html += '<div id="rater"></div>'
                            html += '<div class="button-section"> <button type="button" class="btn">Voir plus</button></div>'
                            html += '</div>'
                    html += '</div>'
                html += '</div>'
            html += '</div>'
        });
        return html;
    };
    
    document.getElementById("articles").innerHTML = generateTree();
})

var rater = require("rater-js");

var  myRater  = rater({ element : document.querySelector("#rater"),rateCallback : function rateCallback(rating){      
    monRater.setRating(notation);
    monRater.désactiver();
}}) ;




// const btnorder = document.getElementById("btn-order");
// const btnfilter = document.getElementById("btn-filter");
// const bodyorder = document.getElementsByClassName("body-order");
// const bodyfilter = document.getElementsByClassName("body-filter");

// function activeFilter() {
//     btnorder.classList.remove('active');
//     btnfilter.classList.add('active');
    
//     bodyorder.remove('active');
//     bodyfilter.classList.add('active');
// }
  
// function activeOrder() {
//     btnfilter.classList.remove('active');
//     btnorder.classList.add('active');
//     bodyfilter.classList.remove('active');
//     bodyorder.add('active');
    
// }
