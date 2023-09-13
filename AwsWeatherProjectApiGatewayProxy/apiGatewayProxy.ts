// Este script crea una nueva API en API Gateway, agrega un recurso llamado weather-proxy, 
// configura un método GET para ese recurso y establece una integración de tipo proxy HTTP 
// con el endpoint real de OpenWeather.

import AWS, { ResourceGroups } from 'aws-sdk';

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

// Paso 2: Crear un recurso (ruta)
const createResource = async (apiId: string, parentId: string, pathPart: string) => {
  const params = { 
    restApiId: apiId,
    parentId: parentId,
    pathPart: pathPart,
  }

  try {
    const resource = await apiGateway.createResource(params).promise();
    console.log('Recurso creado: ', resource)
    return resource;
  } catch (error) {
    console.error('Error al crear el recurso: ', error)
  }
};

// Paso 3: Crear el metodo GET para el recurso 
const createMethod = async (apiId: string, resourceId: string) => { 
  const params = { 
    restApiId: apiId,
    resourceId: resourceId,
    httpMethod: 'GET',
    authorizationType: 'NONE',  // Sin autorizacion requerida para ese caso
  };

  try {
    const method = await apiGateway.putMethod(params).promise();
    console.log('Metodo Get creado: ', method)
    return method
  } catch (error) {
    console.error('Error al crear el metodo GET: ', error)
  }
};

// Paso 4: Configurar la integracion del metodo con el endpoint real
const setupIntegration = async (apiId: string, resourceId: string) => { 
  const params = { 
    restApiId: apiId,
    resourceId: resourceId,
    httpMethod: 'GET',
    type: 'HTTP_PROXY', 
    integrationHttpMethod: 'GET',
    uri: 'https://api.openweathermap.org/data/2.5/weather', // URL del endpoint real
  }

  try {
    const integration = await apiGateway.putIntegration(params).promise();
    console.log('Integration configurada: ', integration);
    return integration;
  } catch (error) {
    console.error('Error al configurar la integracion: ', error)
  }
};

// Funcion principal para ejecutar todos los pasos
const setupAPIGateway = async () => { 
  const api = await createAPI();
  if (api && api.id && api.rootResourceId) { 
    const resource = await createResource(api.id, api.rootResourceId, 'weather-proxy')
    if (resource && resource.id) { 
      await createMethod(api.id, resource.id);
      await setupIntegration(api.id, resource.id);
    }
  }
};

// Ejectua la funcion principal
setupAPIGateway()