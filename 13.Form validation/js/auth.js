import setState from './view.mjs';
import toaster from './toaster.mjs';

const [$signinForm, $signupForm] = document.querySelectorAll('.form');

const validator = {
  userid: inputValue =>
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      inputValue
    ),
  username: inputValue => inputValue.length >= 1,
  password: inputValue => /^[A-Za-z0-9+]{6,12}$/i.test(inputValue),
  'confirm-password': inputValue =>
    [...$signupForm.querySelectorAll('input')].filter(
      $input => $input.name === 'password'
    )[0].value === inputValue
};

const reset = () =>
  setState({
    userid: false,
    username: false,
    password: false,
    confirmpassword: false,
    currentInputContainer: null
  });

const debounce = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

[$signinForm, $signupForm].forEach($form => {
  $form.addEventListener('click', e => {
    if (!e.target.closest('.link')) return;

    [$signinForm, $signupForm].forEach($form =>
      $form.classList.toggle('hidden')
    );
    reset();
  });

  $form.addEventListener('submit', e => {
    e.preventDefault();
    [...$form.querySelectorAll('input')].forEach($input =>
      console.log($input.value)
    );
    toaster.add();
  });

  $form.addEventListener(
    'input',
    debounce(e => {
      const inputName = e.target.name;

      setState({
        [inputName]: validator[inputName](e.target.value),
        currentInputContainer: e.target.closest('.input-container')
      });
    }, 100)
  );
});
