import mongoose from 'mongoose'
const priceSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'trial',
        require: true,
    },
    price: {
        type: String,
        default: '$1',
        require: true
    },
    amount: {
        type: Number,
        default: 1
    },
    period: {
        type: String,
    },
    features: {
        type: Array,
        default: ["1,000 links/month", "Basic analytics", "Standard support"]
    },
    popular: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const priceModel = mongoose.model('priceData', priceSchema)

export default priceModel;