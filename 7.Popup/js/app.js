let state = {
  isPopup: false,
  textList: []
};

const $togglePopup = document.querySelector('.toggle-popup');
const $popupMessage = document.querySelector('.popup-message');
const $modalContainer = document.querySelector('.modal-container');
const $modalInput = document.querySelector('.modal-input');

const render = () => {
  $popupMessage.innerHTML = state.textList
    .map(text => `<div>from popup: ${text}</div>`)
    .join('');

  $modalContainer.classList.toggle('active', state.isPopup);
};

const setState = newState => {
  state = newState;
  render();
};

const addText = newText => {
  setState({
    ...state,
    textList: [newText, ...state.textList],
    isPopup: false
  });
};

$togglePopup.addEventListener('click', () => {
  setState({ ...state, isPopup: true });
});

$modalContainer.addEventListener('click', e => {
  if (e.target.classList.contains('confirm-button')) {
    const content = $modalInput.value.trim();
    if (content) addText(content);
    $modalInput.value = '';
  }
  if (e.target.closest('.button') || !e.target.closest('.modal')) {
    setState({ ...state, isPopup: false });
  }
});

$modalInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    const content = $modalInput.value.trim();
    if (content) addText(content);
    $modalInput.value = '';
  }
});
