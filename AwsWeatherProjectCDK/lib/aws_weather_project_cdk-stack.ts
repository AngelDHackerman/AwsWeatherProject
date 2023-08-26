import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'

export class AwsWeatherProjectCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define la funcion lambda
    const getWeather = new lambda.Function(this, 'getWeatherFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('/home/angel/platziProgramador/AwsWeatherProject/AwsWeatherProjectOpenWeatherLambda'), // codigo que contiene la lambda que se connecta a OpenWeather
      handler: 'getWeather.handler', // exporta una función llamada 'handler' en 'getWeather.js'
      environment: { 
        OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'default_value'  // Tambien se puede usar el AWS Secrects Manager
      },
    });

    // Define la API Rest en API Gateway
    const api = new apigateway.RestApi(this, 'WeatherApi', {
      restApiName: 'Weather Service',
    });

    // Creates a 'weather' resource in the API Gateway, representing the route for weather-related API calls.
    // A GET request to this resource will invoke the 'getWeather' Lambda function.
    // I will look like this: https://abc123.execute-api.us-east-1.amazonaws.com/weather
    const weather = api.root.addResource('weather');

    // Agrega un metodo GET al recurso y conecta la funcion lambda
    weather.addMethod('GET', new apigateway.LambdaIntegration(getWeather))

  }
}
