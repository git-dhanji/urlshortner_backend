import mongoose from "mongoose";
const shortUrlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },

  short_url: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  redirect_url: {
    type: String,
    required: true,
    index: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  qrcode: {
    type: String,
    required: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  }

}, {
  timestamps: true
},
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
