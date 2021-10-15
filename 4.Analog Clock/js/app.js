const MOVE_PER = {
  HOUR: time => 30 * time.hour + 0.5 * time.minute,
  MINUTE: time => 6 * time.minute + 0.1 * time.second,
  SECOND: time => 6 * time.second
};

let state = {
  hour: 0,
  minute: 0,
  second: 0
};

const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

const render = () => {
  $hour.style.setProperty('--deg', MOVE_PER.HOUR(state));
  $minute.style.setProperty('--deg', MOVE_PER.MINUTE(state));
  $second.style.setProperty('--deg', MOVE_PER.SECOND(state));
};

const setState = () => {
  const date = new Date();
  state = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  setState();
  setInterval(setState, 1000);
});
