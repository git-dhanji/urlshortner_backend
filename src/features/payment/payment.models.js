
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
<<<<<<< HEAD
    orderId: { type: String, required: true },
    paymentId: { type: String, required: false },
    signature: { type: String, required: false },
=======
    userMail: { type: String },
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
>>>>>>> main
    receiptId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    method: { type: String },
    notes: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

<<<<<<< HEAD
const paymentModel =  mongoose.model("payment", paymentSchema);
=======
const paymentModel = mongoose.model("payment", paymentSchema);
>>>>>>> main

export default paymentModel;
