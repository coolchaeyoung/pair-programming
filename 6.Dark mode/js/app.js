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

$toggleButton.addEventListener('click', () => {
  setTheme(!isDarkTheme);
});
