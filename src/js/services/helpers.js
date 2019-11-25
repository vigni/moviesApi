// eslint-disable-next-line import/prefer-default-export
export const convertTime = num => {
  let time = "";
  if (num > 60) {
    const fullHours = num / 60;
    const hourSplit = fullHours.toString().split(".");
    const hours = hourSplit[0];

    console.log(hours);
    let minutes = num % 60;
    if (minutes < 10) {
      minutes = `0 ${minutes}`;
    }
    time = `${hours}h${minutes}`;
  }
  if (num != null) {
    time = `${num} minutes`;
  } else {
    time = ``;
  }

  return time;
};
