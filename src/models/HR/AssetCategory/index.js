import mongoose from "mongoose"
import {v4 as uuid, v4} from "uuid"

const AssetCategorySchema = mongoose.Schema({

    asset_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Not-Available'],
      default: 'Available',
    },
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    purchaseDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    cost: {
      type: Number, // Store as float
    },
    uuid:{
        type:String,
        required:false,
        unique:true,
        default:uuid,
    },

    is_active:{
        type:Boolean,
        default:true,
    },
    is_deleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

export const AssetCategoryModel = mongoose.model("AssetCategorymodel",AssetCategorySchema)


const AssetSchema = mongoose.Schema({

    asset:[{ type: mongoose.Schema.Types.ObjectId, ref: 'AssetCategorymodel', required: true }] ,

    category_name:
    {
        type: String,
      required: true,
    },

     description: {
      type: String,
    },

    uuid:{
        type:String,
        required:false,
        unique:true,
        default:uuid,
    },

    is_active:{
        type:Boolean,
        default:true,
    },
    is_deleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true}
)

export const AssetModel = mongoose.model("Assetmodel",AssetSchema)