import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const apiKey = process.env.OPENWEATHER_API_KEY || 'default_key';

  // latitude and longitude already defined
  const lat = 14.64072;
  const lon = -90.51327;

  try {
    // Usando la versión 2.5 de la API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      statusCode: 400,
      body: 'Unable to fetch weather data',
    };
  }
};
