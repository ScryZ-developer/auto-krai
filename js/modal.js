// Получаем элементы
const modalOverlay = document.getElementById('modalOverlay');
const orderModal = document.getElementById('orderModal');
const closeBtn = document.getElementById('closeModal');
const body = document.body;

// Функция открытия модального окна
function openModal() {
    // Блокируем прокрутку страницы
    body.classList.add('modal-open');
    
    // Показываем оверлей и модальное окно
    modalOverlay.style.display = 'block';
    orderModal.style.display = 'block';
    
    // Запускаем анимацию через небольшой таймаут
    setTimeout(() => {
        modalOverlay.classList.add('active');
        orderModal.classList.add('active');
    }, 10);
}

// Функция закрытия модального окна
function closeModal() {
    // Убираем анимацию
    modalOverlay.classList.remove('active');
    orderModal.classList.remove('active');
    
    // После завершения анимации скрываем элементы
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        orderModal.style.display = 'none';
        body.classList.remove('modal-open');
    }, 300);
}

// Открытие формы по клику на любую кнопку с классом button__order
document.querySelectorAll('.button__order').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
});

// Закрытие по кнопке
closeBtn.addEventListener('click', closeModal);

// Закрытие по клику на оверлей
modalOverlay.addEventListener('click', closeModal);

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        closeModal();
    }
});

// Обработка отправки формы
document.getElementById('carOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        city: this.city.value,
        carModel: this.carModel.value,
        country: this.country.value,
        budget: this.budget.value ? `${this.budget.value} ₽` : 'Не указан'
    };
    
    console.log('Форма отправлена:', formData);
    
    // Показываем сообщение об успешной отправке
    alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
    
    // Закрываем модальное окно и сбрасываем форму
    this.reset();
    closeModal();
});

// Маска для ввода бюджета (только цифры)
document.getElementById('budget').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
}); 