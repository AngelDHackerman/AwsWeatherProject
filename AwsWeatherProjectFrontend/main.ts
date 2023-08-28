interface WeatherDetail { 
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherResponse { 
  name: string;
  sys: {
    country: string
  };
  main: {
    temp: number;
    humidity: number;
  };
  wind: { 
    speed: number
  };
  weather: WeatherDetail[];
}

// Función para actualizar el DOM con la información del clima
const updateWeatherInfo = (data: WeatherResponse): void => {
  const countryElement = document.getElementById("country") as HTMLElement;
  const weatherInfoElement = document.getElementById("weather-info") as HTMLElement;

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
const fetchWeatherData = async (cityCountry: string):Promise<void> => {
  try {
    const response = await fetch(`https://blexf7vayb.execute-api.us-east-1.amazonaws.com/prod/weather?q=${cityCountry}`);
    const data: WeatherResponse = await response.json();
    updateWeatherInfo(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Evento para mejorar el cambio en la seleccion de la ciudad
const citySelectElement = document.getElementById('city-select') as HTMLSelectElement;
citySelectElement.addEventListener('change', (event: Event) => { 
  const selectedCityCountry = (event.target as HTMLSelectElement).value;
  console.log(selectedCityCountry)
  fetchWeatherData(selectedCityCountry);
});

// Llamada a la función para obtener la información del clima
fetchWeatherData('Guatemala,gt');
