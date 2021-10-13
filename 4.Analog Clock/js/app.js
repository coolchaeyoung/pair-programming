let state = {
  hour: 0,
  minute: 0,
  second: 0
};

const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

const render = () => {
  $hour.style.setProperty('--deg', 30 * state.hour + 0.5 * state.minute);
  $minute.style.setProperty('--deg', 6 * state.minute + 0.1 * state.second);
  $second.style.setProperty('--deg', 6 * state.second);
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
