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

