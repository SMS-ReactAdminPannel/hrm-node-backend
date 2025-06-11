import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

const Schema = mongoose.Schema

const leaveTypeSchema = new Schema({
    uuid: {
        type: String,
        default: uuid
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    is_paid: {
        type: Boolean,
        default: true
    },
    max_days: {
        type: Number
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, });

export const LeaveType = mongoose.model("LeaveType", leaveTypeSchema);