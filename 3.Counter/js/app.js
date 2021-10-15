const $container = document.querySelector('.container');
const $counter = document.querySelector('.counter');

const setCounter = (function () {
  let counter = 0;

  const render = () => {
    $counter.textContent = counter;
  };

  return num => {
    counter = counter + num < 0 ? 0 : counter + num;
    render();
  };
})();

$container.addEventListener('click', e => {
  const $button = e.target.closest('button');
  if (!$button) return;

  $button.classList.contains('increase') ? setCounter(1) : setCounter(-1);
});
