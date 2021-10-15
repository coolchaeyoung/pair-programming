let state = { isNavigationOpened: false, isInitRender: false };

const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggle = document.querySelector('.toggle');

const render = () => {
  $nav.classList.toggle('active', state.isNavigationOpened);
  [$nav, $main, $toggle].forEach($el =>
    $el.classList.toggle('notransition', state.isInitRender)
  );
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isNavigationOpened', state.isNavigationOpened);
  render();
};

$toggle.addEventListener('click', () => {
  setState({
    isNavigationOpened: !state.isNavigationOpened,
    isInitRender: false
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const isNavigationOpened =
    JSON.parse(sessionStorage.getItem('isNavigationOpened')) || false;
  setState({ isNavigationOpened, isInitRender: true });
});
