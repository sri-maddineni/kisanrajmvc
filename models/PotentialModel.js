import mongoose from "mongoose";
import slugify from "slugify";


// name,description,price,requireDate,organic,quantity,quantityUnit,shipping 

const RequirementSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productSlug: {
            type: String,
            required: true,
        },
        buyerId: {
            type: mongoose.ObjectId,
            ref: "users",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        quantityUnit: {
            type: String,
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
        organic: {
            type: Boolean,
            required: true
        },
        shipping: {
            type: Boolean,
            required: true
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
    },
    { timestamps: true }
);

// Remove unique index from sellerId field

export default mongoose.model("potentials", RequirementSchema);
