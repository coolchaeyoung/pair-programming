const carousel = ($container, images) => {
  let state = {
    currentSlide: 0
  };

  const $fragment = document.createDocumentFragment();

  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.style.setProperty('--duration', 300);
  $carouselSlides.innerHTML = [
    images[images.length - 1],
    ...images,
    [images[0]]
  ]
    .map(src => `<img src="${src}"/>`)
    .join('');
  $fragment.appendChild($carouselSlides);

  [
    { className: 'prev', content: '&laquo;' },
    { className: 'next', content: '&raquo;' }
  ]
    .map(({ className, content }) => {
      const $button = document.createElement('button');
      $button.className = `carousel-control ${className}`;
      $button.innerHTML = content;
      return $button;
    })
    .forEach($button => $fragment.appendChild($button));

  $container.appendChild($fragment);
  // 수정 필요
  $container.style.width = '351px';
  $container.style.opacity = 1;

  const render = () => {
    $carouselSlides.style.setProperty('--currentSlide', state.currentSlide);
  };

  const setState = newState => {
    state = newState;
    render();
  };

  $container.addEventListener('click', e => {
    const $button = e.target.closest('button');
    if (!$button) return;
    $button.classList.contains('prev')
      ? setState({ ...state, currentSlide: state.currentSlide - 1 })
      : setState({ ...state, currentSlide: state.currentSlide + 1 });
  });
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
