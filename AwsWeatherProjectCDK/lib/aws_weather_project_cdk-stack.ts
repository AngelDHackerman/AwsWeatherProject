import { Construct } from "constructs";
import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway'; 

export class AwsWeatherProjectCdkStack extends cdk.Stack { 
  constructor(scope: Construct, id: string, props?: cdk.StackProps) { 
    super(scope, id, props);

    // Inyectamos la funcion lambda como una dependencia
    const getWeather = this.createLambdaFunction();

    // Inyectamos la API Gateway como una dependencia
    const api = this.createApiGateway();

    // Creamos un recurso 'weather' en la API Gateway.
    const weather = api.root.addResource('weather')

    // Agregamos un metodo GET al recurso y conectamos la funcion lambda
    this.addGetMethodToResource(weather, getWeather)
  }

  // Metodo para crear la funcion lambda
  private createLambdaFunction(): lambda.Function { 
    return new lambda.Function(this, 'getWeatherFunction', { 
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('/home/angel/platziProgramador/AwsWeatherProject/AwsWeatherProjectOpenWeatherLambda'),
      handler: 'getWeather.handle',
      environment: { 
        OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'default_value',
      },
    });
  }

  // Metodo para crear la API Gateway
  
}