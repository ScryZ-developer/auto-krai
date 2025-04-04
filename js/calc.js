// Показываем/скрываем поле для электро мощности в зависимости от типа двигателя
document.getElementById('engineType').addEventListener('change', function() {
  const electricPowerGroup = document.getElementById('electricPowerGroup');
  const engineType = this.value;
  
  if (engineType === 'electric' || engineType.includes('hybrid')) {
      electricPowerGroup.style.display = 'block';
  } else {
      electricPowerGroup.style.display = 'none';
  }
});

// Обновляем валюту в зависимости от страны
document.getElementById('country').addEventListener('change', function() {
  const country = this.value;
  const currencyElement = document.getElementById('priceCurrency');
  
  if (country === 'korea') {
      currencyElement.textContent = '₩ (воны)';
  } else if (country === 'japan') {
      currencyElement.textContent = '¥ (иены)';
  } else if (country === 'china') {
      currencyElement.textContent = '¥ (юани)';
  }
});

function calculateCost() {
  // Получаем значения из формы
  const engineType = document.getElementById('engineType').value;
  const country = document.getElementById('country').value;
  const carPrice = parseFloat(document.getElementById('carPrice').value);
  const year = parseInt(document.getElementById('year').value);
  const ownerType = document.getElementById('ownerType').value;
  const engineVolume = parseInt(document.getElementById('engineVolume').value);
  const powerHp = parseInt(document.getElementById('powerHp').value);
  const krwRate = parseFloat(document.getElementById('krwRate').value);
  const jpyRate = parseFloat(document.getElementById('jpyRate').value);
  const cnyRate = parseFloat(document.getElementById('cnyRate').value);
  const electricPower = document.getElementById('electricPowerGroup').style.display === 'block' 
      ? parseInt(document.getElementById('electricPower').value) 
      : 0;

  // Комиссия компании в рублях
  const companyFee = 35000;

  // Рассчитываем таможенные платежи
  let customsDuty = 0;
  let exciseTax = 0;
  let vat = 0;
  let recyclingFee = 0;
  
  // Определяем курс валюты в зависимости от страны
  let exchangeRate = 1;
  if (country === 'korea') exchangeRate = krwRate;
  else if (country === 'japan') exchangeRate = jpyRate;
  else if (country === 'china') exchangeRate = cnyRate;
  
  // Конвертируем стоимость авто в рубли
  const carPriceRub = carPrice * exchangeRate;
  
  // Расчет для Кореи
  if (country === 'korea') {
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
  else if (country === 'japan') {
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
  else if (country === 'china') {
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
      <span style="color: #888">Комиссия компании: ${companyFee.toLocaleString('ru-RU')} ₽</span>
  `;
  document.getElementById('result').style.display = 'block';
}