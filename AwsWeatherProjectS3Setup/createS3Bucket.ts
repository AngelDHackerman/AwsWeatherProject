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
  Bucket: 'weather-project-frontend-bucket',
  // CreateBucketConfiguration: { 
  //   LocationConstraint: 'us-east-1'
  // }
};

// Crea el bucket
s3.createBucket(bucketParams, (err: AWS.AWSError, data: AWS.S3.CreateBucketOutput) => { 
  if (err) { 
    console.log('Error al crear el bucket', err);
  } else { 
    console.log('Bucket creado exitosamente!', data.Location)
  }
})
