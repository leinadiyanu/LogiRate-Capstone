import mongoose from "mongoose";
const { Schema } = mongoose;

const vendorSchema = new Schema({
  name: { type: String, required: true },
  shortName: { type: String }, 
  logo: String,
  description: String,
  services: [String],
  contactInfo: String,
  rating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

vendorSchema.virtual('routes', {
  ref: 'Route',
  localField: '_id',
  foreignField: 'vendorId',
});

vendorSchema.set('toObject', { virtuals: true });
vendorSchema.set('toJSON', { virtuals: true });

export default mongoose.model("Vendor", vendorSchema);