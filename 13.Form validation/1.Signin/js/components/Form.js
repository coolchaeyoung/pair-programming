import InputContainer from './InputContainer.js';
import Toaster from './Toaster.js';

const Form = $form => {
  let state = {
    isValidId: false,
    isValidPassword: false
  };

  // GET DOM
  const inputContainers = $form.querySelectorAll('.input-container');
  const $button = $form.querySelector('button');
  let $idInputContainer;
  let $passwordInputContainer;

  const render = () => {
    $button.disabled = Object.values(state).some(state => !state);
  };

  const setState = newState => {
    state = newState;
    $idInputContainer.setState(newState.isValidId);
    $passwordInputContainer.setState(newState.isValidPassword);
    render();
  };

  $idInputContainer = InputContainer({
    $inputContainer: inputContainers[0],
    validator: idText => {
      const Regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      setState({ ...state, isValidId: Regex.test(idText) });
    },
    errorMessage: '이메일 형식에 맞게 입력하세요.'
  });

  $passwordInputContainer = InputContainer({
    $inputContainer: inputContainers[1],
    validator: passwordText => {
      const Regex = /^[A-Za-z0-9+]{6,12}$/gi;
      setState({
        ...state,
        isValidPassword: Regex.test(passwordText)
      });
    },
    errorMessage: '영문 또는 숫자 12자를 입력하세요.'
  });

  $form.addEventListener('submit', e => {
    e.preventDefault();
    [...inputContainers].forEach($inputContainer => {
      console.log($inputContainer.querySelector('input').value);
    });
    Toaster().add();
  });
};

export default Form;
