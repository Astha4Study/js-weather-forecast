const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSectionSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countryText = document.querySelector('.country-txt');
const tempText = document.querySelector('.temp-txt');
const conditionText = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const dateText = document.querySelector('.current-date-txt');

const apiKey = '17f2815cfe147fc6a9e5692ed3e310a3';

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value); // Menambahkan argumen city
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value); // Menambahkan argumen city
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

function getWeatherIcon(id) {
    if (id >= 200 && id <= 232) {
        return 'thunderstorm.svg';
    } else if (id >= 300 && id <= 321) {
        return 'drizzle.svg';
    } else if (id >= 500 && id <= 531) {
        return 'rain.svg';
    } else if (id >= 600 && id <= 622) {
        return 'snow.svg';
    } else if (id >= 701 && id <= 781) {
        return 'atmosphere.svg';
    } else if (id === 800) {
        return 'clear.svg';
    } else {
        return 'clouds.svg';
    }
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city); // Menggunakan variabel city dengan benar

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return
    }
    console.log(weatherData);

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    countryText.textContent = country;
    tempText.textContent = Math.round(temp) + ' °C';
    conditionText.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + ' M/s'

    dateText.textContent = getCurrentDate();
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSectionSection]
        .forEach(section => section.style.display = 'none');

    section.style.display = 'flex';
}