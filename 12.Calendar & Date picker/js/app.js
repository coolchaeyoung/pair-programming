const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

let state = {
  year: 0,
  month: 0,
  day: 0
};

const $calendarNav = document.querySelector('.calendar-nav');
const $currentMonth = document.querySelector('.currentMonth');
const $currentYear = document.querySelector('.currentYear');
const $calendarGrid = document.querySelector('.calendar-grid');

// 말일
const getLastDateOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

// 1일의 요일
const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

// 말일 요일
const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

const getDay = (year, month, day) => new Date(year, month, day).getDay();

const createAllOfMonth = (year, month) =>
  Array.from(
    {
      length: getLastDateOfMonth(year, month)
    },
    (_, i) => ({ year, month, day: i + 1 })
  );

const render = () => {
  $currentMonth.textContent = MONTH[state.month];
  $currentYear.textContent = state.year;
  const renderWeek = DAY.map(day => `<div>${day}</div>`).join('');

  // 마지막달부터 -- 개수 5개. slice(-5)
  // 현재 달의 1일의 요일. 5일 : 목요일일때

  const currentFirstDayOfMonth = getFirstDayOfMonth(state.year, state.month);
  const currentLastDayOfMonth = getLastDayOfMonth(state.year, state.month);

  const createRenderButton = ({ year, month, day }) => {
    let string =
      getDay(year, month, day) === 0 && month === state.month
        ? 'class="red"'
        : '';
    string += month === state.month ? 'class="black"' : '';

    return `<button ${string} data-year="${year}" data-month="${month}">${day}</button>`;
  };

  const prevDays =
    currentFirstDayOfMonth === 0
      ? ''
      : createAllOfMonth(state.year, state.month - 1)
          .slice(-currentFirstDayOfMonth)
          .map(createRenderButton)
          .join('');

  const currentDays = createAllOfMonth(state.year, state.month)
    .map(createRenderButton)
    .join('');

  const nextDays = createAllOfMonth(state.year, state.month + 1)
    .slice(0, 6 - currentLastDayOfMonth)
    .map(createRenderButton)
    .join('');

  $calendarGrid.innerHTML = renderWeek + prevDays + currentDays + nextDays;
};

const setState = newState => {
  state = newState;
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  setState({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  });
});

$calendarNav.addEventListener('click', e => {
  const $button = e.target.closest('button');
  if (!$button) return;
  if ($button.classList.contains('prev')) {
    state.month - 1 < 0
      ? setState({ ...state, year: state.year - 1, month: 11 })
      : setState({ ...state, month: state.month - 1 });
  }

  if ($button.classList.contains('next')) {
    state.month + 1 > 11
      ? setState({ ...state, year: state.year + 1, month: 0 })
      : setState({ ...state, month: state.month + 1 });
  }
});
