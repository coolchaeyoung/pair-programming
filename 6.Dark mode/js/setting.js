const darkThemeMatches = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

const localTheme =
  JSON.parse(localStorage.getItem('isDarkTheme')) ?? darkThemeMatches;
document.querySelector('body').classList.toggle('dark', localTheme);
