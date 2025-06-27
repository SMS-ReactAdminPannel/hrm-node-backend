import mongoose from 'mongoose';
import {v4 as uuid} from 'uuid';
import validator from 'validator';

const Schema = mongoose.Schema

const VisitorSchema = new Schema({
    uuid: {
        type: String,
        default: uuid
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate(value){
                    if(!validator.isEmail(value)){
                        throw new Error("Invalid email" +value)
                    }
                }
    },
    company: {
        type: String
    },
    purposeOfVisit: {
        type: String,
        required: true,
        enum: ['Interview', 'Meeting', 'Delivery', 'Maintenance', 'Personal', 'Other']
    },
    visitDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    checkInTime: {
        type: String,
        default: Date.now
    },
    checkOutTime: {
        type: String
    },
    idProofType: {
        type: String,
        enum: ['Aadhaar', 'Passport', 'Driver License', 'Other'],
    },
    idProofNumber: {
        type: String
    },
    status: {
        type: String,
        enum: ['Checked-In', 'Checked-Out'],
        default: 'Checked-In'
    },
    remarks: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Visitors = mongoose.model("VisitorSchema", VisitorSchema);