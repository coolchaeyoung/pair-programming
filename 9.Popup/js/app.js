let state = {
  isPopup: false
};

const $togglePopup = document.querySelector('.toggle-popup');
const $popupMessage = document.querySelector('.popup-message');

const render = () => {};
const setState = newState => {
  state = newState;
  render();
};

$togglePopup.addEventListener('click', () => {
  setState({ ...state, isPopup: true });
});
