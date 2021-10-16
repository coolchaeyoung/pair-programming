const MONTHS = [
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

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

let state = {
  dateYear: 0,
  dateMonth: 0, // 0 ~ 11
  dateDay: 0, // 1 ~ 31
  isShow: false
};

const $body = document.querySelector('body');
const $datePicker = document.querySelector('.datePicker');
const $calendar = document.querySelector('.calendar');
const $calendarNav = document.querySelector('.calendar-nav');
const $currentMonth = document.querySelector('.currentMonth');
const $currentYear = document.querySelector('.currentYear');
const $calendarGrid = document.querySelector('.calendar-grid');

const getLastDateOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

const getDay = (year, month, day) => new Date(year, month, day).getDay();

const isEqualDate = (date1, date2) =>
  date1.toDateString() === date2.toDateString();

const createDateOfMonth = (year, month, ...sliceRange) => {
  const createdYear = month === 12 ? year + 1 : month === -1 ? year - 1 : year;
  const createdMonth = month === 12 ? 0 : month === -1 ? 11 : month;

  return Array.from(
    {
      length: getLastDateOfMonth(year, month)
    },
    (_, i) => ({ year: createdYear, month: createdMonth, day: i + 1 })
  ).slice(...sliceRange);
};

const createCalendarDate = ({ year, month, day }) => {
  const sunday =
    getDay(year, month, day) === 0 && month === state.month ? 'red ' : '';
  const weekdays = month === state.month ? 'black ' : '';
  const selectDay = isEqualDate(
    new Date(year, month, day),
    new Date(state.year, state.month, state.day)
  )
    ? 'select '
    : '';
  const today = isEqualDate(new Date(year, month, day), new Date())
    ? 'today '
    : '';
  const classString = (sunday + weekdays + selectDay + today).trim();

  return `<button class="${classString}" data-year="${year}" data-month="${month}">${day}</button>`;
};

const render = () => {
  $currentMonth.textContent = MONTHS[state.month];
  $currentYear.textContent = state.year;

  const currentFirstDayOfMonth = getFirstDayOfMonth(state.year, state.month);
  const currentLastDayOfMonth = getLastDayOfMonth(state.year, state.month);

  const calendarColumnHeader = DAYS.map(day => `<div>${day}</div>`).join('');
  const prevMonthDays =
    currentFirstDayOfMonth === 0
      ? []
      : createDateOfMonth(state.year, state.month - 1, -currentFirstDayOfMonth);
  const currentMonthDays = createDateOfMonth(state.year, state.month, 0);
  const nextMonthDays = createDateOfMonth(
    state.year,
    state.month + 1,
    0,
    6 - currentLastDayOfMonth
  );

  $calendarGrid.innerHTML =
    calendarColumnHeader +
    [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
      .map(createCalendarDate)
      .join('');

  $calendar.classList.toggle('hidden', !state.isShow);
};

const setState = newState => {
  state = newState;
  render();
};

const moveMonth = movedMonth => {
  const year =
    movedMonth < 0
      ? state.year - 1
      : movedMonth > 11
      ? state.year + 1
      : state.year;
  const month = movedMonth < 0 ? 11 : movedMonth > 11 ? 0 : movedMonth;

  setState({ ...state, year, month });
};

$body.addEventListener('click', e => {
  if (!e.target.matches('.datePicker') && !e.target.closest('.calendar'))
    setState({ ...state, isShow: false });
});

$datePicker.addEventListener('click', e => {
  const date = e.target.value === '' ? new Date() : new Date(e.target.value);
  setState({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    isShow: true
  });
});

$calendarNav.addEventListener('click', e => {
  const $button = e.target.closest('button');
  if (!$button) return;

  $button.classList.contains('prev')
    ? moveMonth(state.month - 1)
    : moveMonth(state.month + 1);
});

$calendarGrid.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const { year, month } = e.target.dataset;
  const day = e.target.textContent;
  const format = n => (n < 10 ? '0' + n : n + '');
  $datePicker.value = `${year}-${format(+month + 1)}-${format(day)}`;
  setState({ year: +year, month: +month, day: +day, isShow: false });
});
