import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
  const apiKey = process.env.OPENWEATHER_API_KEY || 'default_key'

  // latitude and longitude already defined
  const lat = 14.64072;
  const lon = -90.51327;

  try { 
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return { 
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) { 
    return { 
      statusCode: 400,
      body: 'Unable to fetch weather data',
    };
  }
};