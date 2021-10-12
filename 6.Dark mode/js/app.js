let isDark = false;

const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

const render = () => {
  $body.classList.toggle('dark', isDark);
};

const setMode = mode => {
  isDark = mode;
  localStorage.setItem('isDark', isDark);
  render();
};

$toggleButton.addEventListener('click', () => {
  setMode(!isDark);
});

window.addEventListener('DOMContentLoaded', () => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const darkModeMatches = darkModeMediaQuery.matches;

  const localMode =
    JSON.parse(localStorage.getItem('isDark')) ?? darkModeMatches;
  setMode(localMode);
});
