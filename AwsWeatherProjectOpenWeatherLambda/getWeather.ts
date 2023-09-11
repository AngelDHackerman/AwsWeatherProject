import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

// Clase WeatherService que encapsula la lógica de obtener datos del clima.
class WeatherService { 
  // Variable estática para almacenar la única instancia de la clase (Singleton Pattern).
  private static instance: WeatherService;

  // Variables privadas para almacenar las dependencias inyectadas.
  private apiKey: string;
  private httpClient: any;

  // Constructor privado para evitar que se creen nuevas instancias desde fuera de la clase.
  private constructor (httpClient: any, apiKey: string) { 
    this.httpClient = httpClient;  // Inyección de la dependencia httpClient (Dependency Injection).
    this.apiKey  = apiKey  // Inyección de la dependencia apiKey (Dependency Injection).
  }

  // Método estático para obtener la única instancia de la clase.
  // Si no existe, la crea e inyecta las dependencias.
  public static getInstance(httpClient = axios, apiKey = process.env.OPENWEATHER_API_KEY || 'default_key'): WeatherService { 
    if (!WeatherService.instance) { 
      WeatherService.instance = new WeatherService(httpClient, apiKey);
    }
    return WeatherService.instance
  }

   // Método para obtener los datos del clima usando el cliente HTTP inyectado.
  public async getWeather(city: string, country: string): Promise<any> { 
    return await this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${this.apiKey}`)
  }
}

// Handler de Lambda que se encarga de procesar el evento y devolver la respuesta.
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
  // Obtiene la unica instancia de WeatherService
  const weatherService = WeatherService.getInstance();

  // Extrae la ciudad y el pais de los parametros de consulta del evento
  const q = event.queryStringParameters?.q || 'Guatemala,gt';
  const [city, country] = q.split(',')

  try { 
    // Usa el servicio para obtener los datos del clima.
    const response = await weatherService.getWeather(city, country);
    return { 
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching weather data: ", error)
    return { 
      statusCode: 400,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: 'Unable to fetch weather data',
    };
  }
};