const $container = document.querySelector('.container');
const $counter = document.querySelector('.counter');

const setCounter = (function () {
  let counter = 0;

  const render = () => {
    $counter.textContent = counter;
    console.log(counter);
  };
  return operand => {
    counter = operand + counter < 0 ? 0 : operand + counter;
    render();
  };
})();

$container.addEventListener('click', e => {
  //   console.log(e.target);
  if (!e.target.matches('.container > button')) return;
  e.target.classList.contains('increase') ? setCounter(1) : setCounter(-1);
});
