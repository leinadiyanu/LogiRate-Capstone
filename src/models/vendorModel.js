import mongoose from "mongoose";

const { Schema } = mongoose;

const vendorSchema = new Schema({
 name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String, // URL to vendor logo
  },
  description: {
    type: String,
    trim: true,
  },
  services: {
    type: [String], // e.g., ['Same Day', 'Interstate']
  },
  areasCovered: {
    type: [String], // e.g., ['Lagos', 'Abuja']
    required: true,
  },
  pricingStructure: [{
    serviceType: { type: String },      // e.g., "Same Day"
    pricePerKg: { type: Number },       // optional
    baseFee: { type: Number },          // optional
    distanceRate: { type: Number },     // optional
    notes: { type: String }             // optional
  }],
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    address: { type: String },
  },
  rating: {
    type: Number, // average rating
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema)
