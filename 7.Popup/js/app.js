let state = {
  isPopupOpened: false,
  textList: []
};

const $togglePopup = document.querySelector('.toggle-popup');
const $popupMessage = document.querySelector('.popup-message');
const $modalContainer = document.querySelector('.modal-container');
const $form = document.querySelector('.form');
const $modalInput = document.querySelector('.modal-input');

const render = () => {
  $popupMessage.innerHTML = state.textList
    .map(text => `<div>from popup: ${text}</div>`)
    .join('');

  $modalContainer.classList.toggle('active', state.isPopupOpened);
};

const setState = newState => {
  state = newState;
  render();
};

const addText = newText => {
  setState({
    ...state,
    textList: [newText, ...state.textList],
    isPopupOpened: false
  });
};

$togglePopup.addEventListener('click', () => {
  setState({ ...state, isPopupOpened: true });
  $modalInput.focus();
});

$modalContainer.addEventListener('click', e => {
  if (e.target.closest('.close') || !e.target.closest('.modal')) {
    setState({ ...state, isPopupOpened: false });
    $modalInput.value = '';
  }
});

$form.addEventListener('submit', e => {
  e.preventDefault();

  const content = $modalInput.value.trim();
  if (content) addText(content);

  $modalInput.value = '';
});
