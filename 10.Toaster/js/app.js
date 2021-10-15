const toaster = (function () {
  const $body = document.querySelector('body');

  const createDivToast = ({ type, title, message }) => {
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
    return $div;
  };

  const remove = () => {
    const $toast = document.querySelector('.toast');
    $body.removeChild($toast);
  };

  return {
    add: newToast => {
      $body.appendChild(createDivToast(newToast));

      const $toasts = document.querySelectorAll('.toast');
      const toastHeight = +window
        .getComputedStyle($toasts[0])
        .getPropertyValue('--toast-height')
        .replace('px', '');
      [...$toasts].forEach(($toast, i, $toasts) => {
        $toast.style.bottom = `${($toasts.length - (i + 1)) * toastHeight}px`;
      });

      setTimeout(remove, 3000);
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
