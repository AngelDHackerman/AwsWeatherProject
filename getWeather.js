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
    // latitude and longitude already defined
    const lat = 14.64072;
    const lon = -90.51327;
    try {
        // Usando la versión 2.5 de la API
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        return {
            statusCode: 400,
            body: 'Unable to fetch weather data',
        };
    }
});
exports.handler = handler;
