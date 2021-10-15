import debounce from '../debounce.js';

const DEBOUNCE_DELAY = 100;

function InputContainer({ $inputContainer, validator, errorMessage }) {
  this.state = false;
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
    if (this.$input.value === '') return;
    this.$iconSuccess.classList.toggle('hidden', !this.state);
    this.$iconError.classList.toggle('hidden', this.state);
    this.$error.textContent = this.state ? '' : errorMessage;
  };

  // Event Binding
  this.$input.addEventListener(
    'input',
    debounce(e => {
      validator(e.target.value);
    }, DEBOUNCE_DELAY)
  );
}

export default InputContainer;
