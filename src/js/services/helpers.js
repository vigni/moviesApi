// eslint-disable-next-line import/prefer-default-export
export const convertTime = num => {
  let time = "";
  if (num >= 60) {
    const fullHours = num / 60;

    const hourSplit = fullHours.toString().split(".");
    const hours = hourSplit[0];

    let minutes = num % 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    time = `${hours}h${minutes}`;
    return time;
  }
  if (num != null) {
    time = `${num} minutes`;
  } else {
    time = ``;
  }
  return time;
};

export const generateCard = (poster, title, id, date, runtime, overview, average) => {
  const urlPictureApi = "https://image.tmdb.org/t/p/original/";
  const datefr = new Date(date);
  const posterUrl = urlPictureApi + poster;
  const averageStarsPourcent = `${average * 10}%`;
  let html = "";
  html = `
      <div>
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img  height="250px" id="picture" src="${poster === null ? posterUrlIfNull : posterUrl}" class="card-img">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="favoris">
                    <h5 class="card-title">${title}</h5>
                    <div
                      id="${id}"
                      onClick="sessionStorage.setItem(id, id)"
                    >
                      <i style="color: red;" class="far fa-heart"></i>
                    </div>
                  </div>
                  <p class="card-text" id ="section-date"><i class="fas fa-calendar-alt"></i><small class="text-muted" id="date">${`${datefr.getDate()}/${datefr.getMonth()}/${datefr.getFullYear()} <span class="sep-date">|</span> ${runtime} `} </small></p>

                  <p class="card-text">${overview}</p>`;

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
                    <button type="button" class="btn"> Voir plus </button>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>`;

  return html;
};