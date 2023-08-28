"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Función para actualizar el DOM con la información del clima
const updateWeatherInfo = (data) => {
    const countryElement = document.getElementById("country");
    const weatherInfoElement = document.getElementById("weather-info");
    if (countryElement && weatherInfoElement) {
        countryElement.textContent = `Current Weather in ${data.name}, ${data.sys.country}`;
        weatherInfoElement.innerHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
    `;
    }
};
// Función para obtener la información del clima desde la API
const fetchWeatherData = (cityCountry) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://blexf7vayb.execute-api.us-east-1.amazonaws.com/prod/weather?q=${cityCountry}`);
        const data = yield response.json();
        updateWeatherInfo(data);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
    }
});
// Evento para mejorar el cambio en la seleccion de la ciudad
const citySelectElement = document.getElementById('city-select');
citySelectElement.addEventListener('change', (event) => {
    const selectedCityCountry = event.target.value;
    console.log(selectedCityCountry);
    fetchWeatherData(selectedCityCountry);
});
// Llamada a la función para obtener la información del clima
fetchWeatherData('London,uk');
