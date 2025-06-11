import mongoose from "mongoose"
import {v4 as uuid} from "uuid"

const Schema = mongoose.Schema

const HolidaySchema = new Schema({
    uuid:{
        type:String,
        default: uuid
    },
    holiday_name: {
        type: String,
        required: true,
        unique:true
    },
    holiday_date: {
        type: Date,
        required: true
    },
    holiday_type: {
        type: String,
        enum: ['national', 'regional', 'optional', 'religious'],
        default:"national",
        required: true,
        lowercase:true
    },
    is_optional: {
        type: Boolean,
        default: false
    },
    recurs_annually: {
        type: Boolean,
        default: true
    },
    is_half_day: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_delete:{
        type:Boolean,
        default:false
    }
}, { timestamps: true, });

export const Holidays = mongoose.model("GovernmentHoliday", HolidaySchema);
