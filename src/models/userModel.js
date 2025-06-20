import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
    first: { type: String, required: true },
    surname: { type: String},
  },
    email: {
        type: String,
        required: true
    }, 
    address: {
        type: String
    },
    password: {
        type: String,
        required: true
    }, 
    resetToken: String,
    resetTokenExpires: Date,

    role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export default mongoose.model('User', userSchema);
