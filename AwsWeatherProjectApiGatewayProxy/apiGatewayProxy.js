"use strict";
// Este script crea una nueva API en API Gateway, agrega un recurso llamado weather-proxy, 
// configura un método GET para ese recurso y establece una integración de tipo proxy HTTP 
// con el endpoint real de OpenWeather.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Configura la region y las credenciales 
aws_sdk_1.default.config.update({
    region: 'us-east-1',
});
const apiGateway = new aws_sdk_1.default.APIGateway();
// Paso 1: Crear la API 
const createAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        name: 'WeatherProxyAPI',
        description: 'API Gateway For Weather App',
    };
    try {
        const api = yield apiGateway.createRestApi(params).promise();
        console.log('API creada: ', api);
        return api;
    }
    catch (error) {
        console.error('Error al crear la API: ', error);
    }
});
// Paso 2: Crear un recurso (ruta)
const createResource = (apiId, parentId, pathPart) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        restApiId: apiId,
        parentId: parentId,
        pathPart: pathPart,
    };
    try {
        const resource = yield apiGateway.createResource(params).promise();
        console.log('Recurso creado: ', resource);
        return resource;
    }
    catch (error) {
        console.error('Error al crear el recurso: ', error);
    }
});
// Paso 3: Crear el metodo GET para el recurso 
const createMethod = (apiId, resourceId) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        restApiId: apiId,
        resourceId: resourceId,
        httpMethod: 'GET',
        authorizationType: 'NONE', // Sin autorizacion requerida para ese caso
    };
    try {
        const method = yield apiGateway.putMethod(params).promise();
        console.log('Metodo Get creado: ', method);
        return method;
    }
    catch (error) {
        console.error('Error al crear el metodo GET: ', error);
    }
});
// Paso 4: Configurar la integracion del metodo con el endpoint real
const setupIntegration = (apiId, resourceId) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        restApiId: apiId,
        resourceId: resourceId,
        httpMethod: 'GET',
        type: 'HTTP_PROXY',
        integrationHttpMethod: 'GET',
        uri: 'https://api.openweathermap.org/data/2.5/weather', // URL del endpoint real
    };
    try {
        const integration = yield apiGateway.putIntegration(params).promise();
        console.log('Integration configurada: ', integration);
        return integration;
    }
    catch (error) {
        console.error('Error al configurar la integracion: ', error);
    }
});
// Funcion principal para ejecutar todos los pasos
const setupAPIGateway = () => __awaiter(void 0, void 0, void 0, function* () {
    const api = yield createAPI();
    if (api && api.id && api.rootResourceId) {
        const resource = yield createResource(api.id, api.rootResourceId, 'weather-proxy');
        if (resource && resource.id) {
            yield createMethod(api.id, resource.id);
            yield setupIntegration(api.id, resource.id);
        }
    }
});
// Ejectua la funcion principal
setupAPIGateway();
