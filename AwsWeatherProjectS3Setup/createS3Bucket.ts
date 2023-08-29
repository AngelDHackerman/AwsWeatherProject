import dotenv from 'dotenv'
dotenv.config();
import * as AWS from 'aws-sdk'

// configura las credenciales y la region
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });

// Crea una nueva instancia del servicio S3
const s3 = new AWS.S3();

// Parametros para la creacion del bucket
const bucketParams: AWS.S3.CreateBucketRequest = { 
  Bucket: 'weatherProjectFrontendBucket',
  CreateBucketConfiguration: { 
    LocationConstraint: 'us-east-1'
  }
};

// Crea el bucket
