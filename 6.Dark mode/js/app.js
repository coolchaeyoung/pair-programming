let isDarkTheme = false;

const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

const render = () => {
  $body.classList.toggle('dark', isDarkTheme);
};

const setTheme = newTheme => {
  isDarkTheme = newTheme;
  localStorage.setItem('isDarkTheme', isDarkTheme);
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  const darkThemeMatches = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  setTheme(JSON.parse(localStorage.getItem('isDarkTheme')) ?? darkThemeMatches);
});

$toggleButton.addEventListener('click', () => {
  setTheme(!isDarkTheme);
});
