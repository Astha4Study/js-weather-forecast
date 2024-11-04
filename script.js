const lokasi = document.getElementById('lokasi');
const kota = document.getElementById('kota');

const cuacaUtamaIcon = document.getElementById('cuaca-utama-icon');
const cuacaUtamaTemp = document.getElementById('cuaca-utama-temp');
const cuacaUtamaWind = document.getElementById('cuaca-utama-wind');
const cuacaUtamahumidity = document.getElementById('cuaca-utama-humidity');
const cuacaUtamaPressure = document.getElementById('cuaca-utama-pressure');

const cuaca1Icon = document.getElementById('cuaca-1-icon');
const cuaca1Temp = document.getElementById('cuaca-1-temp');
const cuaca1Wind = document.getElementById('cuaca-1-wind');
const cuaca1humidity = document.getElementById('cuaca-1-humidity');

const cuaca2Icon = document.getElementById('cuaca-2-icon');
const cuaca2Temp = document.getElementById('cuaca-2-temp');
const cuaca2Wind = document.getElementById('cuaca-2-wind');
const cuaca2humidity = document.getElementById('cuaca-2-humidity');

const cuaca3Icon = document.getElementById('cuaca-3-icon');
const cuaca3Temp = document.getElementById('cuaca-3-temp');
const cuaca3Wind = document.getElementById('cuaca-3-wind');
const cuaca3humidity = document.getElementById('cuaca-3-humidity');

async function getWeather(city = 'purwokerto') {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d8b21c07ae373d57cedb303d944e393e&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const result = await response.json();

        // Update main weather display
        cuacaUtamaIcon.src = getImage(result.list[0].weather[0].main);
        cuacaUtamaTemp.innerText = result.list[0].main.temp + "°C";
        cuacaUtamaWind.innerText = result.list[0].wind.speed + " km/hr";
        cuacaUtamahumidity.innerText = result.list[0].main.humidity + "%";
        cuacaUtamaPressure.innerText = result.list[0].main.pressure + " hPa";

        // Update hourly weather cards
        updateHourlyWeather(result.list[1], cuaca1Icon, cuaca1Temp, cuaca1Wind, cuaca1humidity);
        updateHourlyWeather(result.list[2], cuaca2Icon, cuaca2Temp, cuaca2Wind, cuaca2humidity);
        updateHourlyWeather(result.list[3], cuaca3Icon, cuaca3Temp, cuaca3Wind, cuaca3humidity);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function updateHourlyWeather(data, iconElem, tempElem, windElem, humidityElem) {
    iconElem.src = getImage(data.weather[0].main);
    tempElem.innerText = data.main.temp + "°C";
    windElem.innerText = data.wind.speed + " km/hr";
    humidityElem.innerText = data.main.humidity + "%";
}

function getImage(weather) {
    let src = 'Image/clear.png';
    weather = weather.toLowerCase();

    if (weather === 'clear') {
        src = 'Image/clear.png';
    } else if (weather === 'clouds') {
        src = 'Image/clouds.png';
    } else if (weather === 'drizzle') {
        src = 'Image/drizzle.png';
    } else if (weather === 'mist') {
        src = 'Image/mist.png';
    } else if (weather === 'rain') {
        src = 'Image/rain.png';
    } else if (weather === 'snow') {
        src = 'Image/snow.png';
    }

    return src;
}

function getByCity() {
    const lokasiValue = lokasi.value.trim();
    if (lokasiValue === '') {
        alert('Silakan masukkan nama kota.');
        return;
    }
    kota.innerText = lokasiValue;
    getWeather(lokasiValue);
}

// Inisialisasi dengan cuaca default untuk Purwokerto
getWeather();
