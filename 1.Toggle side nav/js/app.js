// state
let isToggle = false;

const $nav = document.querySelector('nav');
const $toggle = document.querySelector('.toggle');

const render = () => {
  $nav.classList.toggle('active', isToggle);
};

const setIsToggle = newIsToggle => {
  isToggle = newIsToggle;
  // 로컬스토리지에 isToggle 저장.
  localStorage.setItem('isToggle', isToggle);
  render();
};

$toggle.addEventListener('click', () => {
  setIsToggle(!isToggle);
});

window.addEventListener('DOMContentLoaded', () => {
  const localStorageValue =
    JSON.parse(localStorage.getItem('isToggle')) || false;
  console.log(typeof localStorageValue, localStorageValue);
  setIsToggle(localStorageValue);
});
