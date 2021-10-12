const toaster = (function () {
  let toasterList = [];

  const render = () => {
    const $fragment = document.createDocumentFragment();

    toasterList.forEach(({ type, title, message }) => {
      const $div = document.createElement('div');
      $div.className = `toast toast-${type}`;
      $div.innerHTML = `
        <h4 class="toast-heading">${title}</h4>
        <div class="toast-message">
          <svg width="24" height="24">
           <use xlink:href="#${type}" />
          </svg>
        <p>${message}</p>
        </div>
        <a class="close">&times;</a>`;

      $fragment.appendChild($div);
    });
    const $body = document.querySelector('body');
    $body.appendChild($fragment);
  };
  const setToasterList = newToasterList => {
    toasterList = newToasterList;
    render();
  };

  return {
    add: newToaster => {
      setToasterList([...toasterList, newToaster]);
    }
  };
})();

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const createToastAction = (type, title, message) => ({ type, title, message });

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.SUCCESS,
      'Well done!',
      'This is a success alert'
    )
  );

document.querySelector('.show-error').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.ERROR,
      'Check it out!',
      'This is a error alert'
    )
  );

document.querySelector('.show-warning').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.WARNING,
      'Check it out!',
      'This is a warning alert'
    )
  );
