const translations = {
  en: {
    cover_title: "Auto Krai",
    cover_subtitle: "Cars from Korea, China and Japan",
    order_car: "Order a car",
    why_us: "Why us",
    advantage_general: "General",
    advantage_general_text: "Flawless service, many happy clients, 20+ years on the market",
    advantage_support: "Support",
    advantage_support_text: "Full support from order to delivery",
    advantage_saving: "Benefit",
    advantage_saving_text: "Up to 40% savings including all fees and delivery",
    faq: "FAQ - Frequently Asked Questions",
    news: "News",
    reviews: "Client Reviews",
    contacts: "Contacts",
    contacts_info: "Available via WhatsApp, Telegram and phone",
    contacts_hours: "Working hours: 9:00–18:00 (Mon–Fri), 10:00–16:00 (Sat–Sun)",
    contacts_timezone: "Krasnoyarsk Time (+4 UTC)",
    calc_title: "Calculate car cost",
    step_country: "Choose a country",
    country_korea: "Korea",
    country_japan: "Japan",
    country_china: "China",
    next: "Next",
    step_params: "Vehicle Parameters",
    engine_type: "Engine type",
    engine_petrol: "Petrol",
    engine_diesel: "Diesel",
    engine_electric: "Electric",
    engine_diesel_hybrid: "Diesel hybrid",
    engine_petrol_hybrid: "Petrol hybrid",
    car_price: "Car price",
    currency_won: "₩ (won)",
    year: "Year of manufacture",
    owner_type: "Owner type",
    owner_individual: "Individual",
    owner_legal: "Legal entity",
    engine_volume: "Engine volume, cc",
    power_hp: "Horsepower",
    electric_power: "Electric power, kW",
    exchange_rate: "Exchange rate (RUB)",
    currency_rate_info: "Current rate to RUB",
    calc: "Calculate",
    back: "Back",
    results: "Calculation results",
    approx_total: "Approximate total cost:",
    back_to_calc: "Return to calculation",
    we_are_here: "We are here"
  },
  ru: {
    // Русский уже используется по умолчанию в HTML
  }
};

let currentLang = 'ru';
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  document.getElementById('langToggle').innerText = currentLang === 'ru' ? 'EN' : 'RU';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
});