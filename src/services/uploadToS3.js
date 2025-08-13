import { PutObjectCommand } from "@aws-sdk/client-s3"

import s3 from "../config/awsS3.js";


const uploadToS3 = async (buffer, filename) => {
    try {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `qr-codes/${filename}.png`,
            Body: buffer,
            ContentType: 'image/png'
        });

        await s3.send(command);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/qr-codes/${filename}.png`;

    } catch (error) {
        console.log('error from uploadToS3', error);
        throw new Error(error);
    }

}


export default uploadToS3;