// Este script crea una nueva API en API Gateway, agrega un recurso llamado weather-proxy, 
// configura un método GET para ese recurso y establece una integración de tipo proxy HTTP 
// con el endpoint real de OpenWeather.

import AWS from 'aws-sdk';

// Configura la region y las credenciales 
AWS.config.update({
  region: 'us-east-1',
});

const apiGateway = new AWS.APIGateway();

// Paso 1: Crear la API 
const createAPI = async () => { 
  const params = { 
    name: 'WeatherProxyAPI',
    description: 'API Gateway For Weather App',
  };

  try {
    const api = await apiGateway.createRestApi(params).promise();
    console.log('API creada: ', api);
    return api;
  } catch (error) {
    console.error('Error al crear la API: ', error)
  }
}