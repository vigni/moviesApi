import posterUrlIfNull from "../../img/film.png";

export const generateCard = (poster, title, id, date, runtime, overview, average, provenance, actor) => {
  const urlPictureApi = "https://image.tmdb.org/t/p/original/";
  const datefr = new Date(date);
  const posterUrl = urlPictureApi + poster;
  const averageStarsPourcent = `${average * 10}%`;
  let html = "";

  html = `
        
          <div class="card">
            <div class="row no-gutters">
              <div class="col-md-3">
                <img  height="250px" id="picture" src="${
                  poster === null ? posterUrlIfNull : posterUrl
                }" class="card-img">
              </div>
                <div class="col-md-9">
                  <div class="card-body">
                    <div class="favoris">
                      <h5 class="card-title">${title}</h5>`;
                      
  html += `<div
                        class="heart-fav"
                      >`;
  if (provenance === "favorite") {
    html += `<i style="color:red" onClick="deleteFavorite(${id})" class="fas fa-trash"></i>`;
  } else if (Object.keys(sessionStorage).includes(id.toString())) {
    html += `<i style="color: red;" class="fas fa-heart" id="${id}" onClick="changeHeart(${id})"></i>`;
  } else {
    html += `<i style="color: red;" class="far fa-heart" id="${id}" onClick="changeHeart(${id})"></i>`;
  }

  html += `</div>
                    </div>`;
  if (!isNaN(datefr)) {
    html += `<p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${`${
      datefr.getDate() < 10 ? `0${datefr.getDate()}` : datefr.getDate()
    }/${
      datefr.getMonth() < 10 ? `0${datefr.getMonth() + 1}` : datefr.getMonth() + 1
    }/${datefr.getFullYear()} <span class="sep-date">|</span><i class="fas fa-clock"></i> ${runtime} `} </small></p>`;
  } else {
    html += `<p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${` Inconue <span class="sep-date">|</span><i class="fas fa-clock"></i> ${runtime} `} </small></p>`;
  }
  html += `<p class="card-text">${overview}</p>`;
  if (actor != undefined) {
    html += `<p style="text-decoration: underline"class="card-actor">${actor}</p>`;
  }
  html += `<div class="stars-container">
                      <div class="stars-grey">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      
                        <div class="stars-yellow" style="width : ${averageStarsPourcent}">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        
                      </div>
                      <div id="btn-more">
                        <button type="button" class="btn" onClick="viewMore(${id})" id="${id}"> Voir plus </button>
                      </div>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
          `;

  return html;
};

export const generateHtmlDetailsMovie = (
  poster,
  title,
  date,
  runtime,
  overview,
  average,
  genres,
  budget,
  countries,
  id
) => {
  const urlPictureApi = "https://image.tmdb.org/t/p/original/";
  const datefr = new Date(date);

  const posterUrl = urlPictureApi + poster;
  const averageStarsPourcent = `${average * 10}%`;
  let nameGenres = "";
  genres.forEach(function(genre) {
    nameGenres += `${genre.name} `;
  });
  let nameCountry = "";
  countries.forEach(function(country) {
    nameCountry += `${country.name} `;
  });

  let html = "";
  html = `<div class="one-movie-detail row">
              <div class="detail-top col-3">
                <div class="poster-movie">
                  <img id="picture" src="${poster === null ? posterUrlIfNull : posterUrl}" class="card-img" />
                  </div> </div>
              <div class="detail col-9" >
              <div class="title-one-movie">
                <div class="title-heart">`;
  html += `<h5 class="card-title">${title}</h5>`;
  if (Object.keys(sessionStorage).includes(id.toString())) {
    html += `<i style="color: red;" class="fas fa-heart " id="${id}-detail" onClick="changeHeart(${id})"></i>`;
  } else {
    html += `<i style="color: red;" class="far fa-heart" id="${id}-detail" onClick="changeHeart(${id})"></i>`;
  }

  html += `</div><button type="button" id="btn-retour" class="btn" onClick="changeContent('home')"> Retour </button>
              </div>`;

  if (!isNaN(datefr)) {
    html += `<p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${`${
      datefr.getDate() < 10 ? `0${datefr.getDate()}` : datefr.getDate()
    }/${
      datefr.getMonth() < 10 ? `0${datefr.getMonth() + 1}` : datefr.getMonth() + 1
    }/${datefr.getFullYear()} <span class="sep-date">|</span><i class="fas fa-clock"></i> ${runtime} `} </small></p>`;
  } else {
    html += `<p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${` Inconue <span class="sep-date">|</span><i class="fas fa-clock"></i> ${runtime} `} </small></p>`;
  }
  html += `<div class="stars-container">
                      <div class="stars-grey">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      
                        <div class="stars-yellow" style="width : ${averageStarsPourcent}">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                </div>
                
                <p class="card-text"><span class="subtitle">Description: </span> ${overview}</p>
                <div class="secondary-detail">
                  <p><span class="subtitle">Genres: </span> ${nameGenres}</p>
                  <p><span class="subtitle">Directeur:</span></p>
                  <p><span class="subtitle">Budget: </span>${budget}</p>
                  <p><span class="subtitle">Pays: </span>${nameCountry}</p>
                </div>
              </div>  
            
                `;

  return html;
};
