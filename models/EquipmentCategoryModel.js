import mongoose from "mongoose";

// Define schema for equipment_category
const equipmentCategorySchema = new mongoose.Schema({
    equipment_category: { type: String, required: true },
    keywords: { type: String }
}, { timestamps: true });


// Define the EquipmentCategory model
export default mongoose.model('EquipmentCategory', equipmentCategorySchema);