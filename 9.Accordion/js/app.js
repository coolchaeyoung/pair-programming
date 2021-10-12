const $accordion = document.querySelector('.accordion');
let select = '';

const render = () => {
  [...$accordion.querySelectorAll('.menu-container')].forEach(
    $menuContainer => {
      const menuText = $menuContainer.querySelector('.menu').textContent.trim();
      const toggleCondition =
        menuText === select
          ? !$menuContainer.classList.contains('.active')
          : false;
      $menuContainer.classList.toggle('active', toggleCondition);

      const $submenu = $menuContainer.querySelector('.submenu');
      $submenu.style.height =
        menuText === select ? $submenu.scrollHeight + 'px' : 0;
    }
  );
};

const setSelect = newSelect => {
  select = newSelect;
  render();
};

$accordion.addEventListener('click', e => {
  const $menu = e.target.closest('.menu');
  const newSelect = $menu.textContent.trim();
  setSelect(newSelect);
});
