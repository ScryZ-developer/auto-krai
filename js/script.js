// Фиксированный хедер
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) { // Если прокрутка больше 50 пикселей
      header.classList.add('shrink'); // Добавить класс 'shrink'
  } else {
      header.classList.remove('shrink'); // Удалить класс 'shrink'
  }
});