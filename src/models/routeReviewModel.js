import mongoose from 'mongoose';

const {Schema} = mongoose

const routeReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('RouteReview', routeReviewSchema);
