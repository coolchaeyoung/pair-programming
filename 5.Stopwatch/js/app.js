let state = {
  time: 0,
  laps: [],
  isStart: false
};

const $display = document.querySelector('.display');
const [$startOrStop, $resetOrLap] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');

const timeToString = time => {
  const minutes = Math.floor(time / 60000);
  const second = Math.floor((time % 60000) / 1000);
  const millisecond = Math.floor((time % 1000) / 10);
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    second < 10 ? '0' + second : second
  }:${millisecond < 10 ? '0' + millisecond : millisecond}`;
};

const render = () => {
  $display.textContent = timeToString(state.time);

  $startOrStop.textContent = state.isStart ? 'Stop' : 'Start';

  $resetOrLap.toggleAttribute('disabled', !state.time);
  $resetOrLap.textContent = state.isStart ? 'Lap' : 'Reset';

  $laps.innerHTML = `
    <div class="lap-title">Laps</div>
    <div class="lap-title">Time</div>
    ${state.laps
      .map(
        ({ lap, time }) => `<div>${lap}</div><div>${timeToString(time)}</div>`
      )
      .join('')}
  `;
};

const setState = newState => {
  state = newState;
  render();
};

$startOrStop.addEventListener('click', () => {
  const standard = new Date();
  let timerId;
  if (state.isStart) {
    setState({ ...state, isStart: false });
  } else {
    setState({ ...state, isStart: true });
    timerId = setInterval(() => {
      if (!state.isStart) clearInterval(timerId);
      const time = new Date() - standard;
      setState({ ...state, time });
    }, 10);
  }
});

$resetOrLap.addEventListener('click', () => {
  if (state.isStart) {
    setState({
      ...state,
      laps: [...state.laps, { lap: state.laps.length + 1, time: state.time }]
    });
  } else {
    setState({ time: 0, laps: [], isStart: false });
  }
});
