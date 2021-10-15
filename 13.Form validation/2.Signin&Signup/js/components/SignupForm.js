import InputContainer from './inputContainer.js';

function SignupForm($form) {
  this.state = {
    isValidId: false,
    isValidName: false,
    isValidPassword: false,
    isValidPasswordConfirm: false
  };
  // GET DOM
  this.inputContainers = $form.querySelectorAll('.input-container');
  this.$button = $form.querySelector('button');
  this.$link = $form.querySelector('.link');

  this.$idInputContainer = new InputContainer({
    initState: this.state.isValidId,
    $inputContainer: this.inputContainers[0],
    validator: idText => {
      const Regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      this.setState({ ...this.state, isValidId: Regex.test(idText) });
      return Regex.test(idText);
    },
    errorMessage: '이메일 형식에 맞게 입력하세요.'
  });

  this.$nameInputContainer = new InputContainer({
    initState: this.state.isValidName,
    $inputContainer: this.inputContainers[1],
    validator: nameText => {
      this.setState({ ...this.state, isValidName: nameText.length >= 1 });
      return nameText.length >= 1;
    },
    errorMessage: '이름을 입력하세요.'
  });

  this.$passwordInputContainer = new InputContainer({
    initState: this.state.isValidPassword,
    $inputContainer: this.inputContainers[2],
    validator: passwordText => {
      const Regex = /^[A-Za-z0-9+]{6,12}$/i;
      this.setState({
        ...this.state,
        isValidPassword: Regex.test(passwordText)
      });
      return Regex.test(passwordText);
    },
    errorMessage: '영문 또는 숫자 6~12자를 입력하세요.'
  });

  this.$passwordConfirmInputContainer = new InputContainer({
    initState: this.state.isValidPasswordConfirm,
    $inputContainer: this.inputContainers[3],
    validator: passwordConfirmText => {
      this.setState({
        ...this.state,
        isValidPasswordConfirm:
          passwordConfirmText === this.$passwordInputContainer.$input.value
      });
      return passwordConfirmText === this.$passwordInputContainer.$input.value;
    },
    errorMessage: '패스워드가 일치하지 않습니다.'
  });

  this.setState = newState => {
    this.state = newState;
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

export default SignupForm;
