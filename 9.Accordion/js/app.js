let selectedMenuText = '';

const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');

const render = () => {
  [...$menuContainers].forEach($menuContainer => {
    const menuText = $menuContainer.querySelector('.menu').textContent.trim();

    $menuContainer.classList.toggle('active', selectedMenuText === menuText);

    const $submenu = $menuContainer.querySelector('.submenu');
    $submenu.style.height =
      selectedMenuText === menuText ? `${$submenu.scrollHeight}px` : 0;
  });
};

const setSelectedMenuText = newSelectedMenuText => {
  selectedMenuText = newSelectedMenuText;
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  const $submenu = $menuContainers[0].querySelector('.submenu');
  $submenu.style.height = 'auto';
  $submenu.style.height = getComputedStyle($submenu).height;
});

$accordion.addEventListener('click', e => {
  const $menu = e.target.closest('.menu');
  if (!$menu) return;

  setSelectedMenuText($menu.textContent.trim());
});
