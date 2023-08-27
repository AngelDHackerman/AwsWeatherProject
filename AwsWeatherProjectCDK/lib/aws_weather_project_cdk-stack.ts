import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class AwsWeatherProjectCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define la funcion lambda
    const getWeather = new lambda.Function(this, 'getWeatherFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('/home/angel/platziProgramador/AwsWeatherProject/AwsWeatherProjectOpenWeatherLambda'),
      handler: 'getWeather.handler',
      environment: {
        OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'default_value',
      },
    });

    // Define la API Rest en API Gateway
    const api = new apigateway.RestApi(this, 'WeatherApi', {
      restApiName: 'Weather Service',
    });

    // Creates a 'weather' resource in the API Gateway
    const weather = api.root.addResource('weather');

    // Agrega un metodo GET al recurso y conecta la funcion lambda
    const getWeatherMethod = weather.addMethod('GET', new apigateway.LambdaIntegration(getWeather), {
      methodResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        },
      }],
      // @ts-ignore
      integrationResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': "'*'",
        },
      }],
    });

    // Add CORS options
    weather.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
    });
  }
}
