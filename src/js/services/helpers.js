// eslint-disable-next-line import/prefer-default-export
export const convertTime = num => {
  console.log(num);
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
  // console.log(time);
  return time;
};
