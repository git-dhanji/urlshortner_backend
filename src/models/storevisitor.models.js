

import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Visitor", VisitorSchema);
