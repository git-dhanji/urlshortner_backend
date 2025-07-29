import { WrapAsync } from "../../utils/errorHandler.utils.js"
import razorpay from "../../config/razorpay.js";
import crypto from 'crypto';
import paymentModel from "./payment.models.js";






const createOrder = WrapAsync(async (req, res, next) => {
    const { amount, userId, currency = "INR", plan } = req.body;

    try {
        const receiptId = `receipt_${userId}_${Date.now()}`;

        const option = {
            amount: amount * 100,
            currency,
            receipt: receiptId,
        }

        const order = await razorpay.orders.create(option);
        const payment = await paymentModel.create({
            userId,
            orderId: order.id,
            recipeId: receiptId,
            amount: order.amount / 100,
            currency,
            plan,

        })
        res.json({
            message: "order created",
            order,
            payment,
        })
    } catch (error) {
        res.status(500).json({
            message: "Order creation failed",
            error,
        })
    }

})



const verifyPayments = WrapAsync(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        //create signature : 
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');


        if (expectedSignature === razorpay_signature) {
            const updatePaymentModel = await paymentModel.findByIdAndUpdate({ orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    signature: razorpay_signature,
                    status: 'paid',
                }

            )
        }

        res.json({ success: true, message: 'payment successfully completed' });

    } catch (error) {
        res.status(400).json({ success: false, message: 'payment not completed' });
    }
    next(err)
})


export { createOrder, verifyPayments }