 // Текущая выбранная страна
 let selectedCountry = null;
        
 // Курсы валют по умолчанию
 const defaultRates = {
     korea: 0.065,   // 1 KRW = 0.065 RUB
     japan: 0.55,    // 1 JPY = 0.55 RUB
     china: 11.5     // 1 CNY = 11.5 RUB
 };
 
 // Названия валют
 const currencyNames = {
     korea: '₩ (воны)',
     japan: '¥ (иены)',
     china: '¥ (юани)'
 };
 
 // Инициализация страницы
 document.addEventListener('DOMContentLoaded', function() {
     // Выбор страны
     const countryOptions = document.querySelectorAll('.country-option');
     countryOptions.forEach(option => {
         option.addEventListener('click', function() {
             countryOptions.forEach(opt => {
                 opt.classList.remove('selected');
                 opt.style.transform = '';
                 opt.style.boxShadow = '';
             });
             this.classList.add('selected');
             selectedCountry = this.getAttribute('data-country');
             document.getElementById('nextBtn').disabled = false;
             
             // Анимация выбора
             this.style.transform = 'translateY(-5px)';
             this.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.2)';
         });
     });
     
     // Кнопка "Далее"
     document.getElementById('nextBtn').addEventListener('click', function() {
         // Анимация перехода
         document.getElementById('step1').classList.remove('active');
         setTimeout(() => {
             document.getElementById('step2').classList.add('active');
             
             // Устанавливаем курс валюты по умолчанию для выбранной страны
             document.getElementById('exchangeRate').value = defaultRates[selectedCountry];
             document.getElementById('currencyInfo').textContent = currencyNames[selectedCountry];
             
             // Обновляем label для стоимости авто
             document.getElementById('priceLabel').textContent = 
                 `Стоимость авто (${currencyNames[selectedCountry].split(' ')[0]})`;
         }, 400);
     });
     
     // Показываем/скрываем поле для электро мощности
     document.getElementById('engineType').addEventListener('change', function() {
         const electricPowerGroup = document.getElementById('electricPowerGroup');
         const engineType = this.value;
         
         if (engineType === 'electric' || engineType.includes('hybrid')) {
             electricPowerGroup.style.display = 'block';
             setTimeout(() => {
                 electricPowerGroup.style.opacity = '1';
                 electricPowerGroup.style.transform = 'translateY(0)';
             }, 10);
         } else {
             electricPowerGroup.style.opacity = '0';
             electricPowerGroup.style.transform = 'translateY(-10px)';
             setTimeout(() => {
                 electricPowerGroup.style.display = 'none';
             }, 300);
         }
     });
 });
 
 // Функции навигации
 function backToStep1() {
     document.getElementById('step2').classList.remove('active');
     setTimeout(() => {
         document.getElementById('step1').classList.add('active');
     }, 400);
 }
 
 function backToStep2() {
     document.getElementById('step3').classList.remove('active');
     setTimeout(() => {
         document.getElementById('step2').classList.add('active');
     }, 400);
 }
 
 // Основная функция расчета
 function calculateCost() {
     // Получаем значения из формы
     const engineType = document.getElementById('engineType').value;
     const carPrice = parseFloat(document.getElementById('carPrice').value);
     const year = parseInt(document.getElementById('year').value);
     const ownerType = document.getElementById('ownerType').value;
     const engineVolume = parseInt(document.getElementById('engineVolume').value);
     const powerHp = parseInt(document.getElementById('powerHp').value);
     const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);
     const electricPower = document.getElementById('electricPowerGroup').style.display === 'block' 
         ? parseInt(document.getElementById('electricPower').value) 
         : 0;
     
     // Комиссия компании в рублях
     const companyFee = 35000;
     
     // Конвертируем стоимость авто в рубли
     const carPriceRub = carPrice * exchangeRate;
     
     // Рассчитываем таможенные платежи
     let customsDuty = 0;
     let exciseTax = 0;
     let vat = 0;
     let recyclingFee = 0;
     
     // Расчет для Кореи
     if (selectedCountry === 'korea') {
         if (engineVolume <= 1000) {
             customsDuty = carPriceRub * 0.15;
         } else if (engineVolume <= 1500) {
             customsDuty = carPriceRub * 0.2;
         } else if (engineVolume <= 1800) {
             customsDuty = carPriceRub * 0.25;
         } else if (engineVolume <= 2300) {
             customsDuty = carPriceRub * 0.3;
         } else if (engineVolume <= 3000) {
             customsDuty = carPriceRub * 0.35;
         } else {
             customsDuty = carPriceRub * 0.4;
         }
         
         if (powerHp <= 90) {
             exciseTax = powerHp * 30 * exchangeRate;
         } else if (powerHp <= 150) {
             exciseTax = powerHp * 45 * exchangeRate;
         } else {
             exciseTax = powerHp * 60 * exchangeRate;
         }
     }
     // Расчет для Японии
     else if (selectedCountry === 'japan') {
         if (engineVolume <= 1000) {
             customsDuty = carPriceRub * 0.1;
         } else if (engineVolume <= 1500) {
             customsDuty = carPriceRub * 0.15;
         } else if (engineVolume <= 1800) {
             customsDuty = carPriceRub * 0.2;
         } else if (engineVolume <= 2300) {
             customsDuty = carPriceRub * 0.25;
         } else if (engineVolume <= 3000) {
             customsDuty = carPriceRub * 0.3;
         } else {
             customsDuty = carPriceRub * 0.35;
         }
         
         if (powerHp <= 90) {
             exciseTax = powerHp * 25 * exchangeRate;
         } else if (powerHp <= 150) {
             exciseTax = powerHp * 40 * exchangeRate;
         } else {
             exciseTax = powerHp * 55 * exchangeRate;
         }
     }
     // Расчет для Китая
     else if (selectedCountry === 'china') {
         if (engineVolume <= 1000) {
             customsDuty = carPriceRub * 0.2;
         } else if (engineVolume <= 1500) {
             customsDuty = carPriceRub * 0.25;
         } else if (engineVolume <= 1800) {
             customsDuty = carPriceRub * 0.3;
         } else if (engineVolume <= 2300) {
             customsDuty = carPriceRub * 0.35;
         } else if (engineVolume <= 3000) {
             customsDuty = carPriceRub * 0.4;
         } else {
             customsDuty = carPriceRub * 0.45;
         }
         
         if (powerHp <= 90) {
             exciseTax = powerHp * 35 * exchangeRate;
         } else if (powerHp <= 150) {
             exciseTax = powerHp * 50 * exchangeRate;
         } else {
             exciseTax = powerHp * 65 * exchangeRate;
         }
     }
     
     // НДС (для всех стран)
     vat = (carPriceRub + customsDuty + exciseTax) * 0.2;
     
     // Утилизационный сбор (для всех стран)
     recyclingFee = ownerType === 'individual' ? 20000 : 30000;

     // Итоговая стоимость в рублях (включая скрытую комиссию)
     const totalCost = carPriceRub + customsDuty + exciseTax + vat + recyclingFee + companyFee;
     
     // Показываем результат
     document.getElementById('totalCost').textContent = totalCost.toLocaleString('ru-RU') + ' ₽';
     document.getElementById('details').innerHTML = `
         <strong>Детали расчета:</strong><br>
         Стоимость авто: ${carPriceRub.toLocaleString('ru-RU')} ₽<br>
         Таможенная пошлина: ${customsDuty.toLocaleString('ru-RU')} ₽<br>
         Акцизный сбор: ${exciseTax.toLocaleString('ru-RU')} ₽<br>
         НДС: ${vat.toLocaleString('ru-RU')} ₽<br>
         Утилизационный сбор: ${recyclingFee.toLocaleString('ru-RU')} ₽<br>
         <span style="color: #4e4e4e">Комиссия компании: ${companyFee.toLocaleString('ru-RU')} ₽</span>
     `;
     document.getElementById('result').style.display = 'block';
     
     // Переходим на шаг с результатами
     document.getElementById('step2').classList.remove('active');
     setTimeout(() => {
         document.getElementById('step3').classList.add('active');
     }, 400);
 }  