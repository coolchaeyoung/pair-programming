let currentScrollY = 0;

const $scrollIcon = document.querySelector('.scroll-icon');

const render = () => {
  $scrollIcon.style.display = currentScrollY >= 100 ? 'block' : 'none';
};

const setCurrentScrollY = newCurrentScrollY => {
  currentScrollY = newCurrentScrollY;
  render();
};

const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

window.addEventListener(
  'scroll',
  throttle(() => {
    setCurrentScrollY(window.pageYOffset);
  }, 100)
);

$scrollIcon.addEventListener('click', () => {
  setCurrentScrollY(0);
  window.scroll({ top: 0, behavior: 'smooth' });
});
