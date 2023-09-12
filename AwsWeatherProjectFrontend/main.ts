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

class WeatherAPI { 
  private static BASE_URL = 'https://blexf7vayb.execute-api.us-east-1.amazonaws.com/prod/weather';

  // Metodo para obtener la informacion del clima desde la API 
  public static async fetchWeatherData (cityCountry: string): Promise<WeatherResponse> { 
    const response = await fetch(`${this.BASE_URL}?q=${cityCountry}`);
    return await response.json();
  }
}

class WeatherUI { 
  public static updateWeatherInfo(data: WeatherResponse): void { 
    const countryElement = document.getElementById("country") as HTMLElement;
    const weatherInfoElement = document.getElementById("weather-info") as HTMLElement;

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