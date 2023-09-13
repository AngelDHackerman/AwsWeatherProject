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
        pathPart: parentId,
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
