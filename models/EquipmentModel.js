import mongoose,{Schema} from "mongoose";

// Define schema for equipment
const equipmentSchema = new mongoose.Schema({
  equipment_category_id: {
    type: Schema.Types.ObjectId,
    ref: 'EquipmentCategory' // Reference to equipment_category model
  },
  equipment_desc: { type: String, default: null },
  equipment_model: { type: String, default: null },
  license: { type: String, default: null },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' // Reference to user model
  },
},{timestamps:true});

// Define the Equipment model
export default mongoose.model('Equipment', equipmentSchema);