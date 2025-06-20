import mongoose from "mongoose";
const { Schema } = mongoose;

const routeSchema = new Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: String,  // consider ISO 8601 string or HH:mm
  arrivalTime: String,
  duration: String,
  price: { type: Number, required: true },
  availableSeats: Number,
  vehicle: {
  layout: { type: String },
  type: { type: String },
  features: [{ type: String }],
  seats: { type: Number }
}
}, { timestamps: true });

export default mongoose.model("Route", routeSchema);
