document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.steps-carousel');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const cards = document.querySelectorAll('.step-card');
  
  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      scrollToCard(index);
    });
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.carousel-dots button');
  dots[0].classList.add('active');
  
  // Update dots on scroll
  carousel.addEventListener('scroll', () => {
    const cardIndex = Math.round(carousel.scrollLeft / (carousel.scrollWidth / cards.length));
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === cardIndex);
    });
  });
  
  // Navigation
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  });
  
  function scrollToCard(index) {
    const cardWidth = document.querySelector('.step-card').offsetWidth + 20;
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  }
});