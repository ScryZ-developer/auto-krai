// Замените скрипт из первого варианта на этот:
document.querySelectorAll('.questions__header').forEach(header => {
  header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');
      content.classList.toggle('active');
  });
});