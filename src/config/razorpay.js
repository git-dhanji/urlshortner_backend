import { configDotenv } from "dotenv";
configDotenv(); // Load environment variables FIRST before any other imports
import Razorpay from 'razorpay'

import { AppError } from '../utils/errorHandler.utils.js';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new AppError("Razorpay env variables missing");
}



const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default razorpay;