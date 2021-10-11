let state = {
  time: 0,
  laps: [],
  isStart: false
};

const $display = document.querySelector('.display');

const [$startOrStop, $resetOrLap] = document.querySelectorAll('.control');

const render = () => {
  const minutes = Math.floor(state.time / 60000);
  const second = Math.floor((state.time % 60000) / 1000);
  const millisecond = Math.floor((state.time % 1000) / 10);
  $display.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${
    second < 10 ? '0' + second : second
  }:${millisecond < 10 ? '0' + millisecond : millisecond}`;

  $startOrStop.textContent = state.isStart ? 'Stop' : 'Start';

  $resetOrLap.toggleAttribute('disabled', !state.isStart);
  $resetOrLap.textContent = state.isStart ? 'Lap' : 'Reset';
};

const setState = newState => {
  state = newState;
  render();
};

$startOrStop.addEventListener('click', () => {
  const standard = new Date();
  const timerId = setInterval(() => {
    if (state.isStart) {
      clearInterval(timerId);
      setState({ ...this.state, isStart: false });
    }
    const time = new Date() - standard;
    setState({ ...state, time, isStart: true });
  }, 10);
});

$resetOrLap.addEventListener('click', () => {
  if (state.isStart) {
    setState({});
  } else {
    setState({
      ...this.state,
      laps: [...this.laps, { lap: state.laps.length + 1, time: state.time }]
    });
  }
});
