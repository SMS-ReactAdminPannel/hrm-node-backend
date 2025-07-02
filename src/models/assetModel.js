import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const assetSchema = new mongoose.Schema({
    uuid: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    category: String,
    value: Number,
    assignedTo: String,
    purchaseDate: Date,
    status: { type: String, default: "Available" },
    serialNumber: { type: String, required: true }, 
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  }, { timestamps: true });
  

export default mongoose.model("assetmodels", assetSchema);  