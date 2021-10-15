const carousel = ($container, images) => {
  const DURATION = 300;
  let isTransitionWorking = false;
  let currentSlide = 1;

  // Create DOM
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

  // state function
  const render = () => {
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  const setCurrentSlide = newCurrentSlide => {
    currentSlide = newCurrentSlide;
    render();
  };

  const move = num => {
    if (isTransitionWorking) return;

    isTransitionWorking = true;
    $carouselSlides.style.setProperty('--duration', DURATION);
    setCurrentSlide(currentSlide + num);
  };

  // Event bindings
  window.addEventListener('load', () => {
    $container.style.width = `${document.querySelector('img').clientWidth}px`;
    $container.style.opacity = 1;
  });

  $container.addEventListener('click', e => {
    const $button = e.target.closest('button');
    if (!$button) return;

    $button.classList.contains('prev') ? move(-1) : move(1);
  });

  $carouselSlides.addEventListener('transitionend', () => {
    const newCurrentSlide =
      currentSlide === 0
        ? images.length
        : currentSlide === images.length + 1
        ? 1
        : currentSlide;

    $carouselSlides.style.setProperty('--duration', 0);
    setCurrentSlide(newCurrentSlide);

    isTransitionWorking = false;
  });

  render();
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
