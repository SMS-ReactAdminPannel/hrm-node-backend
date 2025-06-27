import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

const Schema = mongoose.Schema

const shiftSchema = new Schema({
    uuid: {
        type: String,
        default: uuid
    },
    name: {
        type: String,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    duration_hours: {
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
}, { timestamps: true });

export const shift = mongoose.model("shiftSchema", shiftSchema);


const employeeShiftSchema = new Schema({
    uuid: {
        type: String,
        default: uuid
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeUser'
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shiftSchema'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_delete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date
    },
});

export const employeeShift = mongoose.model("employeeShiftSchema", employeeShiftSchema)