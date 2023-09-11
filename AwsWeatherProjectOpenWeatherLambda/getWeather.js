"use strict";
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
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
// Clase WeatherService que encapsula la lógica de obtener datos del clima.
class WeatherService {
    // Constructor privado para evitar que se creen nuevas instancias desde fuera de la clase.
    constructor(httpClient, apiKey) {
        this.httpClient = httpClient; // Inyección de la dependencia httpClient (Dependency Injection).
        this.apiKey = apiKey; // Inyección de la dependencia apiKey (Dependency Injection).
    }
    // Método estático para obtener la única instancia de la clase.
    // Si no existe, la crea e inyecta las dependencias.
    static getInstance(httpClient = axios_1.default, apiKey = process.env.OPENWEATHER_API_KEY || 'default_key') {
        if (!WeatherService.instance) {
            WeatherService.instance = new WeatherService(httpClient, apiKey);
        }
        return WeatherService.instance;
    }
    // Método para obtener los datos del clima usando el cliente HTTP inyectado.
    getWeather(city, country) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${this.apiKey}`);
        });
    }
}
// Handler de Lambda que se encarga de procesar el evento y devolver la respuesta.
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtiene la unica instancia de WeatherService
    const weatherService = WeatherService.getInstance();
    // Extrae la ciudad y el pais de los parametros de consulta del evento
    const q = ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.q) || 'Guatemala,gt';
    const [city, country] = q.split(',');
    try {
        // Usa el servicio para obtener los datos del clima.
        const response = yield weatherService.getWeather(city, country);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(response.data),
        };
    }
    catch (error) {
        console.error("Error fetching weather data: ", error);
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
});
exports.handler = handler;
