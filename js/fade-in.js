document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  };

  const checkVisibility = () => {
      fadeElements.forEach((element) => {
          if (isElementInViewport(element)) {
              element.classList.add('visible');
          }
      });
  };

  // Проверяем видимость при загрузке страницы
  checkVisibility();

  // Проверяем видимость при скролле
  window.addEventListener('scroll', checkVisibility);
});