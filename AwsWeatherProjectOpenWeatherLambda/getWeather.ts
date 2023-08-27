import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const apiKey = process.env.OPENWEATHER_API_KEY || 'default_key';

  // city and country for the nowcast
  const city:string = 'Guatemala';
  const country:string = 'gt';

  try {
    // Usando la versión 2.5 de la API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Permite a cualquier origen acceder
        "Access-Control-Allow-Methods": "GET", // Permite solo el método GET
        "Access-Control-Allow-Headers": "Content-Type" // Permite solo encabezados de tipo de contenido
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Permite a cualquier origen acceder
        "Access-Control-Allow-Methods": "GET", // Permite solo el método GET
        "Access-Control-Allow-Headers": "Content-Type" // Permite solo encabezados de tipo de contenido
      },
      body: 'Unable to fetch weather data',
    };
  }

};
