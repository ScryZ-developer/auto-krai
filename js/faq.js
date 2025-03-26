// Замените скрипт из первого варианта на этот:
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');
      content.classList.toggle('active');
  });
});