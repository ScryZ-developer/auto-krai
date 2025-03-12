// Фиксированный хедер
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) { // Если прокрутка больше 50 пикселей
      header.classList.add('shrink'); // Добавить класс 'shrink'
  } else {
      header.classList.remove('shrink'); // Удалить класс 'shrink'
  }
});

// Модальное окно формы
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("modal");
  const openButtons = document.querySelectorAll(".button__order");
  const closeButton = document.querySelector(".close-button");

  // Открываем модальное окно при нажатии на кнопку
  openButtons.forEach(button => {
      button.addEventListener("click", function() {
          modal.style.display = "block";
      });
  });

  // Закрываем модальное окно при нажатии на крестик
  closeButton.addEventListener("click", function() {
      modal.style.display = "none";
  });

  // Закрываем модальное окно при нажатии вне его области
  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});