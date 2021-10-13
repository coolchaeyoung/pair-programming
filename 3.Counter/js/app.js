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
  if (!e.target.matches('.container > button')) return;
  e.target.classList.contains('increase') ? setCounter(1) : setCounter(-1);
});
