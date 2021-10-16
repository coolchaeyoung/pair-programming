let currentTabIndex = 0;

const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');

const renderInit = contents => {
  const navTabs = `
    <nav>${contents
      .map(
        ({ title }, i) => `<div class="tab" data-index="${i}">${title}</div>`
      )
      .join('')}
      <span class="glider"></span>
    </nav>`;
  const tabContents = contents
    .map(
      ({ content }, i) =>
        `<div class="tab-content ${
          currentTabIndex === i ? 'active' : ''
        }">${content}</div>`
    )
    .join('');

  $tabs.style.setProperty('--tabs-length', contents.length);
  $tabs.innerHTML = navTabs + tabContents;
  $spinner.style.display = 'none';
};

const render = () => {
  const navTabWidth = +window
    .getComputedStyle($tabs)
    .getPropertyValue('--tab-width');

  const $glider = document.querySelector('.glider');
  $glider.style.left = navTabWidth * currentTabIndex + 'px';

  [...document.querySelectorAll('.tab-content')].forEach(($tabContent, i) =>
    $tabContent.classList.toggle('active', i === currentTabIndex)
  );
};

const setCurrentTabIndex = newCurrentTabIndex => {
  currentTabIndex = newCurrentTabIndex;
  render();
};

const fetchTabsData = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });

window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(data => {
    renderInit(data);
  });
});

$tabs.addEventListener('click', e => {
  if (!e.target.matches('.tab')) return;

  setCurrentTabIndex(+e.target.dataset.index);
});
