let state = {
  displayTime: 0,
  laps: [],
  isRunning: false
};

const $display = document.querySelector('.display');
const [$startOrStop, $resetOrLap] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');

const timeToString = time => {
  const minutes = Math.floor(time / 60000);
  const second = Math.floor((time % 60000) / 1000);
  const millisecond = Math.floor((time % 1000) / 10);

  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(minutes)}:${format(second)}:${format(millisecond)}`;
};

const render = () => {
  $display.textContent = timeToString(state.displayTime);
  $startOrStop.textContent = state.isRunning ? 'Stop' : 'Start';

  $resetOrLap.toggleAttribute('disabled', !state.displayTime);
  $resetOrLap.textContent = state.isRunning ? 'Lap' : 'Reset';

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

const stop = () => setState({ ...state, isRunning: false });

const start = () => {
  setState({ ...state, isRunning: true });
  const standardTime = new Date().getTime() - state.displayTime;

  const timerId = setInterval(() => {
    if (!state.isRunning) clearInterval(timerId);

    const displayTime = new Date() - standardTime;
    setState({ ...state, displayTime });
  }, 10);
};

const addLap = newLap => setState({ ...state, laps: [...state.laps, newLap] });

const reset = () => setState({ displayTime: 0, laps: [], isRunning: false });

$startOrStop.addEventListener('click', () => {
  state.isRunning ? stop() : start();
});

$resetOrLap.addEventListener('click', () => {
  state.isRunning
    ? addLap({ lap: state.laps.length + 1, time: state.displayTime })
    : reset();
});
