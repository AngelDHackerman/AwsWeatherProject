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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.OPENWEATHER_API_KEY || 'default_key';
    // city and country for the nowcast
    const city = 'Guatemala';
    const country = 'gt';
    try {
        // Usando la versión 2.5 de la API
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`);
        return {
            statusCode: 200,
            // Agregando las Cabeceras CORS
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type" // Permite solo encabezados de tipo de contenido
            },
            body: JSON.stringify(response.data),
        };
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type" // Permite solo encabezados de tipo de contenido
            },
            body: 'Unable to fetch weather data',
        };
    }
});
exports.handler = handler;