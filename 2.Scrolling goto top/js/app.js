let scrollPosition = 0;

const $scrollIcon = document.querySelector('.scroll-icon');

const render = () => {
  $scrollIcon.style.display = scrollPosition >= 100 ? 'block' : 'none';
};

const setScrollPosition = newScrollPosition => {
  scrollPosition = newScrollPosition;
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
    setScrollPosition(window.pageYOffset);
  }, 100)
);
$scrollIcon.addEventListener('click', () => {
  setScrollPosition(0);
  window.scroll({ top: 0, behavior: 'smooth' });
});
