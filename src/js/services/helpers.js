// eslint-disable-next-line import/prefer-default-export
export const sliceOverview = (resume) => {
  let overviewSlice = resume;
  if (overviewSlice.length > 250) {
    overviewSlice = `${resume.slice(0, 250)}...`;
  }
  return overviewSlice;
}

export const formatDateForApi = () => {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const feedDropDownYears = () => {
  const min = 1891;
  const max = new Date().getFullYear();
  const select = document.getElementById("dropdown-years");

  for (let i = max; i >= min; i--) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    select.appendChild(opt);
  }
};

export const convertTime = num => {
  let time = "";
  if (num == "0" || num == null) {
    return `Inconnu`;
  }
  if (num >= 60) {
    const fullHours = num / 60;

    const hourSplit = fullHours.toString().split(".");
    const hours = hourSplit[0];

    let minutes = num % 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    time = `${hours}h${minutes}`;
  } else {
    time = `${num} mins`;
  }

  return time;
};

