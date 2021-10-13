const VALID_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error'
};

let state = {
  isValidId: 'error',
  isValidPassword: 'error'
};

const $idInput = document.getElementById('signin-userid');
const $pwInput = document.getElementById('signin-password');
const $signin = document.querySelector('.signin.button');

const render = () => {
  // id
  const [$idSuccessIcon, $idFailedIcon] =
    $idInput.parentNode.querySelectorAll('.icon');
  if ($idInput.value) {
    $idSuccessIcon.classList.toggle(
      'hidden',
      state.isValidId !== VALID_TYPE.SUCCESS
    );
    $idFailedIcon.classList.toggle(
      'hidden',
      state.isValidId === VALID_TYPE.SUCCESS
    );
    const $idError = $idInput.parentNode.querySelector('.error');
    $idError.textContent =
      state.isValidId === VALID_TYPE.SUCCESS
        ? ''
        : '이메일 형식에 맞게 입력하세요.';
  }

  // pw
  if ($pwInput.value) {
    const [$pwSuccessIcon, $pwFailedIcon] =
      $pwInput.parentNode.querySelectorAll('.icon');
    $pwSuccessIcon.classList.toggle(
      'hidden',
      state.isValidPassword !== VALID_TYPE.SUCCESS
    );
    $pwFailedIcon.classList.toggle(
      'hidden',
      state.isValidPassword === VALID_TYPE.SUCCESS
    );
    const $pwError = $pwInput.parentNode.querySelector('.error');
    $pwError.textContent =
      state.isValidPassword === VALID_TYPE.SUCCESS
        ? ''
        : '영문 또는 숫자 12자를 입력하세요';
  }

  $signin.disabled = !(
    VALID_TYPE.SUCCESS === state.isValidId &&
    VALID_TYPE.SUCCESS === state.isValidPassword
  );
};

const setState = newState => {
  state = newState;
  render();
};

const idValidation = inputValue => {
  const idRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  idRegex.test(inputValue)
    ? setState({ ...state, isValidId: VALID_TYPE.SUCCESS })
    : setState({ ...state, isValidId: VALID_TYPE.ERROR });
};

const pwValidation = inputValue => {
  const pwRegex = /^[A-Za-z0-9+]{6,12}$/gi;
  pwRegex.test(inputValue)
    ? setState({ ...state, isValidPassword: VALID_TYPE.SUCCESS })
    : setState({ ...state, isValidPassword: VALID_TYPE.ERROR });
};

const debounce = (callback, delay) => {
  let timerId;
  // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
    // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

$idInput.addEventListener(
  'input',
  debounce(e => {
    idValidation(e.target.value);
  }, 100)
);

$pwInput.addEventListener(
  'input',
  debounce(e => {
    pwValidation(e.target.value);
  }, 100)
);

$signin.addEventListener('click', e => {
  e.preventDefault();
  console.log(`id : ${$idInput.value}`);
  console.log(`pw : ${$pwInput.value}`);
});
