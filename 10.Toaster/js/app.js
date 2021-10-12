const toaster = (function () {
  let state = {
    toasterList: [],
    isShowState: false
  };

  const render = () => {
    const $body = document.querySelector('body');
    const $toasts = document.querySelectorAll('.toast');

    if (state.isShowState) {
      const $fragment = document.createDocumentFragment();
      [...$toasts].forEach(($toast, i, $toasts) => {
        $toast.style.bottom = ($toasts.length - i) * 100 + 'px';
      });

      const { type, title, message } =
        state.toasterList[state.toasterList.length - 1];
      const $div = document.createElement('div');
      $div.className = `toast toast-${type}`;
      $div.style.bottom = 0;
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

      $body.appendChild($fragment);
    } else {
      const $toast = document.querySelector('.toast');
      $body.removeChild($toast);
    }
  };

  const setState = newState => {
    state = newState;
    console.log(state.toasterList);
    render();
  };

  return {
    add: newToaster => {
      setState({
        ...state,
        toasterList: [...state.toasterList, newToaster],
        isShowState: true
      });
      setTimeout(() => {
        setState({
          ...state,
          toasterList: state.toasterList.slice(1),
          isShowState: false
        });
      }, 3000);
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
