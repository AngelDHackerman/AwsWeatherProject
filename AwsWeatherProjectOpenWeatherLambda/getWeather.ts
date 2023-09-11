import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

class WeatherService { 
  private static instance: WeatherService;
  private apiKey: string;
  private httpClient: any;

  private constructor (httpClient: any, apiKey: string) { 
    this.httpClient = httpClient;
    this.apiKey  = apiKey
  }

  // Creating the only instances for the class "WeatherService"
  public static getInstance(httpClient = axios, apiKey = process.env.OPENWEATHER_API_KEY || 'default_key'): WeatherService { 
    if (!WeatherService.instance) { 
      WeatherService.instance = new WeatherService(httpClient, apiKey);
    }
    return WeatherService.instance
  }

  public async getWeather(city: string, country: string): Promise<any> { 
    
  }
}