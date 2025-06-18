import mongoose from "mongoose"
import {v4 as uuid, v4} from "uuid"

const AssetCategorySchema = mongoose.Schema({

    id:{
        type:String
    },
    asset_name:{
        type:String
    },

    description:{
        type:String
    },
    asset_status:{
        type:String,
    },
    uuid:{
        type:String,
        required:false,
        unique:true,
        default:uuid
    },
    asset_id:{
        type:String
    },
    asset_batch:{
        type:String
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

export const AssetCategoryModel = mongoose.model("Assetmodel",AssetCategorySchema)