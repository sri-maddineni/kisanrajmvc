import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    sellerId: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    productId: {
      type: mongoose.ObjectId,
      ref: "products",
      required: true,
    },
    sentBy: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: true,
      default: ""
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    combinedId: {
      type: String,
      required: true,
      unique: true,
    },
    
  },
  { timestamps: true }
);

// Remove unique index from sellerId field


// Concatenate sellerId and productId to generate combinedId
RequirementSchema.pre("save", function (next) {
  this.combinedId = `${this.sellerId}_${this.productId}_${this.buyerId}`;
  next();
});

export default mongoose.model("requirements", RequirementSchema);
