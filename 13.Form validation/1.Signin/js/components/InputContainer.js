import debounce from '../debounce.js';

const DEBOUNCE_DELAY = 100;

const InputContainer = ({ $inputContainer, validator, errorMessage }) => {
  let state = false;
  // Get DOMs
  const $input = $inputContainer.querySelector('input');
  const $iconSuccess = $inputContainer.querySelector('.icon-success');
  const $iconError = $inputContainer.querySelector('.icon-error');
  const $error = $inputContainer.querySelector('.error');

  // Default Methods

  const render = () => {
    if ($input.value === '') return;
    $iconSuccess.classList.toggle('hidden', !state);
    $iconError.classList.toggle('hidden', state);
    $error.textContent = state ? '' : errorMessage;
  };

  const setState = newState => {
    state = newState;
    render();
  };

  // Event Binding
  $input.addEventListener(
    'input',
    debounce(e => {
      validator(e.target.value);
    }, DEBOUNCE_DELAY)
  );

  return {
    setState
  };
};

export default InputContainer;
