import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const assetCategorySchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AssetCategory", assetCategorySchema);