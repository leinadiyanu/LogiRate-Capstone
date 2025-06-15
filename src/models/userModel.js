import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
    first: { type: String, required: true },
    surname: { type: String, required: true },
  },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);
