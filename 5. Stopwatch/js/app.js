// state
let state = {
  time: 0,
  labs: [],
  isStart: false
};

const $display = document.querySelector('.display');
const $start = document.querySelector('.control');

const render = () => {
  const minutes = Math.floor(state.time / 60000);
  const second = Math.floor((state.time % 60000) / 1000);
  const millisecond = Math.floor((state.time % 1000) / 10);
  $display.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${
    second < 10 ? '0' + second : second
  }:${millisecond < 10 ? '0' + millisecond : millisecond}`;
};

const setState = newState => {
  state = newState;
  render();
};

$start.addEventListener('click', e => {
  const standard = new Date();
  const timerId = setInterval(() => {
    const time = new Date() - standard;
    setState({ ...state, time, isStart: true });
  }, 10);
});
