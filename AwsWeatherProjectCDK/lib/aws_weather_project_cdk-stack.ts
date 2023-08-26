import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apitgateway from '@aws-cdk/aws-apigateway'

export class WeatherApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define la funcion lambda
    const getWeather = new lambda.Function(this, 'getWeatherFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('../../AwsWeatherProjectOpenWeatherLambda'), // codigo que contiene la lambda que se connecta a OpenWeather
      handler: 'getWeather.handler', // exporta una función llamada 'handler' en 'getWeather.js'
      environment: { 
        OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'default_value'  // Tambien se puede usar el AWS Secrects Manager
      },
    });

    // Define la API Rest en API Gateway
    const api = new apitgateway.RestApi(this, 'WeatherApi', {
      restApiName: 'Weather Service',
    });

    // Crea un nuevo recurso

  }
}


