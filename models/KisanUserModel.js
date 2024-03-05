import mongoose from "mongoose";

const kisanUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    proposed: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products' // Assuming your product model is named 'Product'
      }],
      required: true,
      default: []
    },
    role: {
      type: String,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("kisanusers", kisanUserSchema);
