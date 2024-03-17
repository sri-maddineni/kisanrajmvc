import mongoose from "mongoose";

const NegHistory = new mongoose.Schema(
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






export default mongoose.model("neghistory", NegHistory);
