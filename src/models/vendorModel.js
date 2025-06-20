import mongoose from "mongoose";
const { Schema } = mongoose;

const vendorSchema = new Schema({
  name: { type: String, required: true },
  logo: String,
  description: String,
  services: [String],
  contactInfo: {
    email: String,
    phone: String,
    website: String,
    address: String
  },
  rating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);

