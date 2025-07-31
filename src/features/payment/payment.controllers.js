import { WrapAsync } from "../../utils/errorHandler.utils.js"
import razorpay from "../../config/razorpay.js";
import crypto from 'crypto';
import paymentModel from "./payment.models.js";
import User from "../../models/user.models.js";
import priceModel from "../../models/price.model.js";






const createOrder = WrapAsync(async (req, res, next) => {
    const { userId, currency, plan } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found -- login please" });
    }

    //verify amount and plans :- 
    const { name, amount } = await priceModel.findOne({ name: plan })

    if (!name) {
        return res.status(404).json({ message: 'plan name not match any plan' })
    }

    try {
        const receiptId = `receipt_${Date.now()}`;
        const options = {
            amount: amount * 100,
            currency,
            receipt: receiptId,
            notes: {
                plan: name,
                userId: user?.email
            }
        }

        const order = await razorpay.orders.create(options);
        const payment = await paymentModel.create({
            userId,
            orderId: order.id,
            recipeId: receiptId,
            amount: order.amount,
            currency,
        })
        res.json({
            message: "order created",
            order,
            payment
        })

    } catch (error) {
        console.log(error)
        res.status(403).json({
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

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        const updatePaymentModel = await paymentModel.findOneAndUpdate({ orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
                status: 'paid',
            },
            {
                new: true
            }
        )

        //only for pro
        const now = new Date();
        const oneMonthLater = new Date(now);
        oneMonthLater.setMonth(now.getMonth() + 1);
        const updateUser = await User.findByIdAndUpdate({ _id: updatePaymentModel.userId }, {
            isSubscribe: true,
            subscriptionStart: now,
            subscriptionEnd: oneMonthLater
        }, { new: true })

        res.json({ success: true, message: 'payment successfully completed', data: updateUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'payment not completed' });
    }
})


export { createOrder, verifyPayments }