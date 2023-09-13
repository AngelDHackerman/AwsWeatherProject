// Este script crea una nueva API en API Gateway, agrega un recurso llamado weather-proxy, 
// configura un método GET para ese recurso y establece una integración de tipo proxy HTTP 
// con el endpoint real de OpenWeather.

import AWS from 'aws-sdk';
