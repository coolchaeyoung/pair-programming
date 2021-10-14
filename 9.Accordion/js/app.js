let select = '';

const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');

const render = () => {
  [...$menuContainers].forEach($menuContainer => {
    const menuText = $menuContainer.querySelector('.menu').textContent.trim();

    $menuContainer.classList.toggle('active', select === menuText);

    const $submenu = $menuContainer.querySelector('.submenu');
    $submenu.style.height =
      menuText === select ? $submenu.scrollHeight + 'px' : 0;
  });
};

const setSelect = newSelect => {
  select = newSelect;
  render();
};

$accordion.addEventListener('click', e => {
  const $menu = e.target.closest('.menu');
  if (!$menu) return;

  const newSelect = $menu.textContent.trim();
  setSelect(newSelect);
});
