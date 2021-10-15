import SigninForm from './components/SigninForm.js';
import SignupForm from './components/SignupForm.js';

let state = {
  isSigninFormHidden: false,
  isSignupFormHidden: true
};

const $signinForm = new SigninForm(document.querySelector('.form signin'));
const $signupForm = new SignupForm(document.querySelector('.form signup'));

const setState = newState => {
  state = newState;
  $signinForm.setState(newState);
  $signupForm.setState(newState);
};

document.querySelector('body').addEventListener('click', e => {
  if (!e.target.closest('.link')) return;
  setState({
    isSigninFormHidden: !state.isSigninFormHidden,
    isSignupFormHidden: !state.isSignupFormHidden
  });
});
