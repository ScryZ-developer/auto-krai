document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 75; // ширина карточки + margin
  const visibleCards = 3;
  const totalCards = cards.length;
  
  function updateButtons() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalCards - visibleCards;
  }
  
  function moveCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      updateButtons();
  }
  
  nextBtn.addEventListener('click', function() {
      if (currentIndex < totalCards - visibleCards) {
          currentIndex++;
          moveCarousel();
      }
  });
  
  prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
          currentIndex--;
          moveCarousel();
      }
  });
  
  // Инициализация кнопок
  updateButtons();
  
  // Адаптация при изменении размера окна
  window.addEventListener('resize', function() {
      cardWidth = cards[0].offsetWidth + 20;
      moveCarousel();
  });
});