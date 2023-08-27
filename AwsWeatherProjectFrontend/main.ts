// Función para actualizar el DOM con la información del clima
const updateWeatherInfo = (data: any) => {
  const countryElement = document.getElementById("country");
  const weatherInfoElement = document.getElementById("weather-info");

  if (countryElement && weatherInfoElement) {
    countryElement.textContent = `Current Weather in ${data.name}, ${data.sys.country}`;
    weatherInfoElement.innerHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  }
};

// Función para obtener la información del clima desde la API
const fetchWeatherData = async () => {
  try {
    const response = await fetch("https://ut7zhsg2ra.execute-api.us-east-1.amazonaws.com/prod/weather");
    const data = await response.json();
    updateWeatherInfo(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Llamada a la función para obtener la información del clima
fetchWeatherData();
