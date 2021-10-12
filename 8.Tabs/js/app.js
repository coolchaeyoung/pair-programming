let state = {
  isLoading: true,
  selected: 0
};

const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');

const init = contentList => {
  const navTab = `<nav>${contentList
    .map(
      ({ title }, index) =>
        `<div class="tab" data-index="${index}">${title}</div>`
    )
    .join('')}
    <span class="glider"></span>
  </nav>`;

  const tabContents = contentList
    .map(
      ({ content }, index) =>
        `<div class="tab-content ${
          +state.selected === index ? 'active' : ''
        }">${content}</div>`
    )
    .join('');
  $tabs.style.setProperty('--tabs-length', contentList.length);
  $tabs.innerHTML = navTab + tabContents;
};

const render = () => {
  const $glider = document.querySelector('.glider');
  $spinner.style.display = state.isLoading ? 'block' : 'none';

  const gliderWidth = +window
    .getComputedStyle($tabs)
    .getPropertyValue('--tab-width')
    .trim();

  $glider.style.left = gliderWidth * +state.selected + 'px';
  // console.log(gliderWidth, state.selected);
};

const setState = newState => {
  state = newState;
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

// Do something!

window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(data => {
    init(data);
    setState({ ...state, isLoading: false });
  });
});

$tabs.addEventListener('click', e => {
  if (!e.target.matches('.tab')) return;

  setState({ ...state, selected: e.target.dataset.index });
});
