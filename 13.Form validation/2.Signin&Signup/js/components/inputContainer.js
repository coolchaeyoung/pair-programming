import debounce from '../debounce.js';

const DEBOUNCE_DELAY = 100;
const VALID_TYPE = {
  INIT: 'init',
  SUCCESS: 'success',
  ERROR: 'error'
};

function InputContainer({
  initState,
  $inputContainer,
  validator,
  errorMessage
}) {
  this.state = initState;
  // Get DOMs
  this.$input = $inputContainer.querySelector('input');
  this.$iconSuccess = $inputContainer.querySelector('.icon-success');
  this.$iconError = $inputContainer.querySelector('.icon-error');
  this.$error = $inputContainer.querySelector('.error');

  // Default Methods
  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    this.$iconSuccess.classList.toggle('hidden', !this.state);
    this.$iconError.classList.toggle('hidden', this.state);
    this.$error.textContent = this.state ? '' : errorMessage;
  };

  // Event Binding
  this.$input.addEventListener(
    'input',
    debounce(e => {
      this.setState(validator(e.target.value));
    }, DEBOUNCE_DELAY)
  );
}

export default InputContainer;
