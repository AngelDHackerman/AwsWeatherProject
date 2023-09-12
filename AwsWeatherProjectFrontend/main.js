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
class WeatherAPI {
    // Metodo para obtener la informacion del clima desde la API 
    static fetchWeatherData(cityCountry) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.BASE_URL}?q=${cityCountry}`);
            return yield response.json();
        });
    }
}
WeatherAPI.BASE_URL = 'https://blexf7vayb.execute-api.us-east-1.amazonaws.com/prod/weather';
class WeatherUI {
    static updateWeatherInfo(data) {
        const countryElement = document.getElementById("country");
        const weatherInfoElement = document.getElementById("weather-info");
        // Convertir la temperatura de Kelvin a grados Celcius
        const tempInCelsius = data.main.temp - 273.5;
        if (countryElement && weatherInfoElement) {
            countryElement.textContent = `Current Weather in ${data.name}, ${data.sys.country}`;
            weatherInfoElement.innerHTML = `
      <p id='p1'>Temperature: ${tempInCelsius.toFixed(2)}°C</p>
      <p id='p2'>Humidity: ${data.main.humidity}%</p>
      <p id='p3'>Wind Speed: ${data.wind.speed} m/s</p>
      <p id='p4'>Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
      `;
        }
    }
}
// Evento para manejar el cambio en la seccion de la ciudad
const citySelectElement = document.getElementById('city-select');
citySelectElement.addEventListener('change', (event) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedCityCountry = event.target.value;
    const data = yield WeatherAPI.fetchWeatherData(selectedCityCountry);
    WeatherUI.updateWeatherInfo(data);
}));
// llamada inicial jpara obtener la informacion del clima 
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield WeatherAPI.fetchWeatherData('Guatemala,gt');
    WeatherUI.updateWeatherInfo(data);
}))();
