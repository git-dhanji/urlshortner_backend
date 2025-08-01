// models/qrCodeModel.js
import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        unique: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    downloadCount: {
        type: Number,
        default: 0,
    }
});

const QrCode = mongoose.model('QrCode', qrCodeSchema);
export default QrCode;
