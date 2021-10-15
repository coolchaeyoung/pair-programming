const carousel = ($container, images) => {
  const DURATION = 600;
  let isTransitionEnd = true;

  let state = {
    currentSlide: 1,
    duration: DURATION
  };

  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.innerHTML = [
    images[images.length - 1],
    ...images,
    [images[0]]
  ]
    .map(src => `<img src="${src}"/>`)
    .join('');

  const $fragment = document.createDocumentFragment();
  $fragment.appendChild($carouselSlides);

  const buttonInfos = [
    { className: 'prev', content: '&laquo;' },
    { className: 'next', content: '&raquo;' }
  ];
  buttonInfos
    .map(({ className, content }) => {
      const $button = document.createElement('button');
      $button.className = `carousel-control ${className}`;
      $button.innerHTML = content;
      return $button;
    })
    .forEach($button => $fragment.appendChild($button));

  $container.appendChild($fragment);

  const render = () => {
    $carouselSlides.style.setProperty('--duration', state.duration);
    $carouselSlides.style.setProperty('--currentSlide', state.currentSlide);
  };

  const setState = newState => {
    state = newState;
    render();
  };

  const move = num => {
    if (!isTransitionEnd) return;
    isTransitionEnd = false;
    setState({ currentSlide: state.currentSlide + num, duration: DURATION });
  };

  window.addEventListener('load', () => {
    $container.style.width = document.querySelector('img').clientWidth + 'px';
    $container.style.opacity = 1;
  });

  $container.addEventListener('click', e => {
    const $button = e.target.closest('button');
    if (!$button) return;
    $button.classList.contains('prev') ? move(-1) : move(1);
  });

  $carouselSlides.addEventListener('transitionend', () => {
    const nextSlide =
      state.currentSlide === 0
        ? images.length
        : state.currentSlide === images.length + 1
        ? 1
        : state.currentSlide;

    setState({ currentSlide: nextSlide, duration: 0 });

    isTransitionEnd = true;
  });

  render();
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
