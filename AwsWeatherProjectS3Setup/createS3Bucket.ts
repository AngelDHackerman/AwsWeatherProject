import dotenv from 'dotenv'
dotenv.config();
import * as AWS from 'aws-sdk'

// configura las credenciales y la region
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  