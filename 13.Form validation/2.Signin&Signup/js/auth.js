let state = {
  isValidId: false,
  isValidPassword: false,
  isValidSignupId: false,
  isValidSignupName: null,
  isValidSignupPw: false,
  isValidSignupConfirm: false
};

const [$signInForm, $signUpForm] = document.querySelectorAll('.form');
const $signinUserId = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');
const $signinButton = document.querySelector('.signin.button');

const $signupUserId = document.getElementById('signup-userid');
const $signupName = document.getElementById('signup-name');
const $signupPassword = document.getElementById('signup-password');
const $signupConfirmPassword = document.getElementById(
  'signup-confirm-password'
);
const $signupButton = document.querySelector('.signup.button');

const render = () => {
  // sign in
  // id
  const [$signinIdSuccessIcon, $signinIdFailedIcon] =
    $signinUserId.parentNode.querySelectorAll('.icon');
  if ($signinUserId.value) {
    $signinIdSuccessIcon.classList.toggle('hidden', !state.isValidId);
    $signinIdFailedIcon.classList.toggle('hidden', state.isValidId);
    const $idError = $signinUserId.parentNode.querySelector('.error');
    $idError.textContent = state.isValidId
      ? ''
      : '이메일 형식에 맞게 입력하세요.';
  }

  // pw
  if ($signinPassword.value) {
    const [$pwSuccessIcon, $pwFailedIcon] =
      $signinPassword.parentNode.querySelectorAll('.icon');
    $pwSuccessIcon.classList.toggle('hidden', !state.isValidPassword);
    $pwFailedIcon.classList.toggle('hidden', state.isValidPassword);
    const $pwError = $signinPassword.parentNode.querySelector('.error');
    $pwError.textContent = state.isValidPassword
      ? ''
      : '영문 또는 숫자 12자를 입력하세요';
  }

  $signinButton.disabled = !(state.isValidId && state.isValidPassword);

  /// sign up

  // id
  const [$signupIdSuccessIcon, $signupIdFailedIcon] =
    $signupUserId.parentNode.querySelectorAll('.icon');
  if ($signupUserId.value) {
    $signupIdSuccessIcon.classList.toggle('hidden', !state.isValidSignupId);
    $signupIdFailedIcon.classList.toggle('hidden', state.isValidSignupId);
    const $idError = $signupUserId.parentNode.querySelector('.error');
    $idError.textContent = state.isValidSignupId
      ? ''
      : '이메일 형식에 맞게 입력하세요.';
  }

  // name
  const [$signupNameSuccessIcon, $signupNameFailedIcon] =
    $signupName.parentNode.querySelectorAll('.icon');
  if (state.isValidSignupName !== null) {
    $signupNameSuccessIcon.classList.toggle('hidden', !state.isValidSignupName);
    $signupNameFailedIcon.classList.toggle('hidden', state.isValidSignupName);
    const $NameError = $signupName.parentNode.querySelector('.error');
    $NameError.textContent = state.isValidSignupName
      ? ''
      : '이메일 형식에 맞게 입력하세요.';
  }

  // pw
  if ($signupPassword.value) {
    const [$signupPwSuccessIcon, $signupPwFailedIcon] =
      $signupPassword.parentNode.querySelectorAll('.icon');
    $signupPwSuccessIcon.classList.toggle('hidden', !state.isValidSignupPw);
    $signupPwFailedIcon.classList.toggle('hidden', state.isValidSignupPw);
    const $pwError = $signupPassword.parentNode.querySelector('.error');
    $pwError.textContent = state.isValidSignupPw
      ? ''
      : '영문 또는 숫자 12자를 입력하세요';
  }

  // pw confirm
  if ($signupConfirmPassword.value) {
    const [$signupConfirmSuccessIcon, $signupConfirmFailedIcon] =
      $signupConfirmPassword.parentNode.querySelectorAll('.icon');
    $signupConfirmSuccessIcon.classList.toggle(
      'hidden',
      !state.isValidSignupConfirm
    );
    $signupConfirmFailedIcon.classList.toggle(
      'hidden',
      state.isValidSignupConfirm
    );
    const $pwConfirmError =
      $signupConfirmPassword.parentNode.querySelector('.error');
    $pwConfirmError.textContent = state.isValidSignupConfirm
      ? ''
      : '패스워드가 일치하지 않습니다.';
  }
};

const setState = newState => {
  state = newState;
  render();
};

const idValidation = inputValue => {
  const idRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  idRegex.test(inputValue)
    ? setState({ ...state, isValidId: true })
    : setState({ ...state, isValidId: false });
};

const pwValidation = inputValue => {
  const pwRegex = /^[A-Za-z0-9+]{6,12}$/gi;
  pwRegex.test(inputValue)
    ? setState({ ...state, isValidPassword: true })
    : setState({ ...state, isValidPassword: false });
};

const nameValidation = inputValue => {
  setState({
    ...state,
    isValidSignupName: inputValue.length >= 1
  });
};

const confirmValidation = inputValue => {
  setState({
    ...state,
    isValidSignupConfirm: $signupPassword.value === inputValue
  });
};

const debounce = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

// sign in
$signInForm.addEventListener('click', e => {
  if (!e.target.closest('.link')) return;

  $signInForm.classList.add('hidden');
  $signUpForm.classList.remove('hidden');
});

$signinUserId.addEventListener(
  'input',
  debounce(e => {
    idValidation(e.target.value);
  }, 100)
);

$signinPassword.addEventListener(
  'input',
  debounce(e => {
    pwValidation(e.target.value);
  }, 100)
);

$signinButton.addEventListener('click', e => {
  e.preventDefault();
  console.log(`id : ${$signinUserId.value}`);
  console.log(`pw : ${$signinPassword.value}`);
});

// sign up
$signUpForm.addEventListener('click', e => {
  if (!e.target.closest('.link')) return;

  $signUpForm.classList.add('hidden');
  $signInForm.classList.remove('hidden');
});

$signupUserId.addEventListener(
  'input',
  debounce(e => {
    idValidation(e.target.value);
  }, 100)
);

$signupName.addEventListener(
  'input',
  debounce(e => {
    nameValidation(e.target.value);
  }, 100)
);

$signupPassword.addEventListener(
  'input',
  debounce(e => {
    pwValidation(e.target.value);
  }, 100)
);

$signupConfirmPassword.addEventListener(
  'input',
  debounce(e => {
    confirmValidation(e.target.value);
  }, 100)
);

$signupButton.addEventListener('click', e => {
  e.preventDefault();
  console.log(`id : ${$signupUserId.value}`);
  console.log(`pw : ${$signupPassword.value}`);
});
