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
const axios_1 = __importDefault(require("axios"));
class WeatherService {
    constructor(httpClient, apiKey) {
        this.httpClient = httpClient;
        this.apiKey = apiKey;
    }
    // Creating the only instances for the class "WeatherService"
    static getInstance(httpClient = axios_1.default, apiKey = process.env.OPENWEATHER_API_KEY || 'default_key') {
        if (!WeatherService.instance) {
            WeatherService.instance = new WeatherService(httpClient, apiKey);
        }
        return WeatherService.instance;
    }
    getWeather(city, country) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
