document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.getElementById('burgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;
  
  // Проверяем ширину экрана при загрузке
  if (window.innerWidth <= 768) {
    burgerMenu.style.display = 'block';
  }
  
  // Обработчик для бургер-меню
  burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });
  
  // Закрытие меню при клике на ссылку
  const mobileLinks = document.querySelectorAll('.mobile-nav__list-item-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      mobileNav.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      burgerMenu.classList.remove('active');
      mobileNav.classList.remove('active');
      body.classList.remove('no-scroll');
      burgerMenu.style.display = 'none';
    } else {
      burgerMenu.style.display = 'block';
    }
  });
});