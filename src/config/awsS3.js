
import dotenv from 'dotenv';
dotenv.config();

import { S3Client } from "@aws-sdk/client-s3";
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
});

export default s3;