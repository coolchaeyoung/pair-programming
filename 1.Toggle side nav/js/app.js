// FIXME: isToggle -> isExpanded
let state = { isToggle: false, isInit: false };

const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggle = document.querySelector('.toggle');

const render = () => {
  $nav.classList.toggle('active', state.isToggle);
  [$nav, $main, $toggle].forEach($el =>
    $el.classList.toggle('notransition', state.isInit)
  );
};

const setState = newState => {
  state = newState;
  sessionStorage.setItem('isToggle', state.isToggle);
  render();
};

$toggle.addEventListener('click', () => {
  setState({ isToggle: !state.isToggle, isInit: false });
});

window.addEventListener('DOMContentLoaded', () => {
  const isToggle = JSON.parse(sessionStorage.getItem('isToggle')) || false;
  setState({ isToggle, isInit: true });
});
