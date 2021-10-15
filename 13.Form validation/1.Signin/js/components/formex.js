import InputContainer from './InputContainer.js';

function Form($form) {
  this.state = {
    isValidId: false,
    isValidPassword: false
  };
  // GET DOM
  this.inputContainers = $form.querySelectorAll('.input-container');
  this.$button = $form.querySelector('button');

  this.$idInputContainer = new InputContainer({
    $inputContainer: this.inputContainers[0],
    validator: idText => {
      const Regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      this.setState({ ...this.state, isValidId: Regex.test(idText) });
    },
    errorMessage: '이메일 형식에 맞게 입력하세요.'
  });

  this.$passwordInputContainer = new InputContainer({
    $inputContainer: this.inputContainers[1],
    validator: passwordText => {
      const Regex = /^[A-Za-z0-9+]{6,12}$/gi;
      this.setState({
        ...this.state,
        isValidPassword: Regex.test(passwordText)
      });
    },
    errorMessage: '영문 또는 숫자 12자를 입력하세요.'
  });

  this.setState = newState => {
    this.state = newState;
    this.$idInputContainer.setState(newState.isValidId);
    this.$passwordInputContainer.setState(newState.isValidPassword);
    this.render();
  };

  this.render = () => {
    this.$button.disabled = Object.values(this.state).some(state => !state);
  };

  $form.addEventListener('submit', e => {
    e.preventDefault();
    [...this.inputContainers].forEach($inputContainer => {
      console.log($inputContainer.querySelector('input').value);
    });
  });
}

export default Form;
