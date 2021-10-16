let state = {
  userid: false,
  username: false,
  password: false,
  confirmpassword: false,
  currentInputContainer: null
};

const errorMessage = {
  userid: '이메일 형식에 맞게 입력하세요.',
  username: '이름을 입력하세요.',
  password: '영문 또는 숫자 6~12자를 입력하세요',
  'confirm-password': '패스워드가 일치하지 않습니다.'
};

const render = () => {
  if (!state.currentInputContainer) return;
  const $form = state.currentInputContainer.closest('.form');
  const [$iconSuccess, $iconError] =
    state.currentInputContainer.querySelectorAll('.icon');
  const $error = state.currentInputContainer.querySelector('.error');
  const $button = $form.querySelector('button');

  const inputName = state.currentInputContainer.querySelector('input').name;
  $iconSuccess.classList.toggle('hidden', !state[inputName]);
  $iconError.classList.toggle('hidden', state[inputName]);
  $error.textContent = state[inputName] ? '' : errorMessage[inputName];

  $button.disabled = [...$form.querySelectorAll('input')].some(
    $input => !state[$input.name]
  );
};

const setState = newState => {
  state = { ...state, ...newState };
  render();
};

export default setState;
