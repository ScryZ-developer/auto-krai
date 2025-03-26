document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  const earlyTriggerOffset = 160; // Элементы появятся на 160px раньшк

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - earlyTriggerOffset) && 
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
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

  // Проверяем видимость при скролле с троттлингом для оптимизации
  let isThrottled = false;
  window.addEventListener('scroll', () => {
    if (!isThrottled) {
      checkVisibility();
      isThrottled = true;
      setTimeout(() => { isThrottled = false; }, 100);
    }
  });
});