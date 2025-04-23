document.addEventListener('DOMContentLoaded', function() {
  const currencyContainer = document.querySelector('.header__rate-container');
  const currencyItems = document.querySelectorAll('.header__rate-item');
  let currentIndex = 0;
  let rates = {};
  let updateInterval;

  // Функция для получения курсов валют с API ЦБ РФ
  async function fetchRates() {
      try {
          const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
          const data = await response.json();
          
          // Получаем курсы валют (ЦБ РФ предоставляет JPY и CNY, но не KRW, поэтому считаем через USD)
          const usdRate = data.Valute.USD.Value;
          const jpyRate = data.Valute.JPY.Value / data.Valute.JPY.Nominal;
          const cnyRate = data.Valute.CNY.Value / data.Valute.CNY.Nominal;
          
          // KRW нет в API ЦБ, поэтому используем фиксированный коэффициент (1 USD = 1426 KRW)
          const krwPerUsd = 1426;
          const krwRate = (usdRate / krwPerUsd).toFixed(6);
          
          rates = {
              KRW: krwRate,
              JPY: jpyRate.toFixed(4),
              CNY: cnyRate.toFixed(4)
          };
          
          updateCurrencyDisplay();
          startRotation();
      } catch (error) {
          console.error('Ошибка при получении курсов валют:', error);
          // Запасные значения на случай ошибки
          rates = {
              KRW: '0.0056',
              JPY: '0.5532',
              CNY: '11.3456'
          };
          updateCurrencyDisplay();
          startRotation();
      }
  }

  // Функция для обновления отображения валют
  function updateCurrencyDisplay() {
      currencyItems.forEach(item => {
          const currency = item.getAttribute('data-currency');
          item.textContent = `${rates[currency]}`;
      });
  }

  // Функция для переключения валют
  function rotateCurrencies() {
      // Скрываем текущую валюту
      currencyItems[currentIndex].classList.remove('active');
      
      // Переходим к следующей валюте
      currentIndex = (currentIndex + 1) % currencyItems.length;
      
      // Показываем новую валюту
      currencyItems[currentIndex].classList.add('active');
  }

  // Запускаем автоматическое переключение
  function startRotation() {
      // Показываем первую валюту
      currencyItems[0].classList.add('active');
      
      // Устанавливаем интервал переключения
      updateInterval = setInterval(rotateCurrencies, 10000);
  }

  // Запускаем процесс
  fetchRates();

  // Очищаем интервал при разгрузке страницы
  window.addEventListener('beforeunload', () => {
      if (updateInterval) {
          clearInterval(updateInterval);
      }
  });
});