import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

const Schema = mongoose.Schema

const DeductionTypeSchema = new Schema({
    uuid:{
        type: String,
        default: uuid,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
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
}, { timestamps: true });

export const DeductionType = mongoose.model('DeductionType', DeductionTypeSchema);


const EmployeeDeductionSchema = new Schema({
    uuid: {
        type: String,
        default: uuid,
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeUser',
        required: true
    },
    deductionTypeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeductionType',
        required: true
    }],
    is_percentage: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        required: function () { return !this.is_percentage; }
    },
    percentage: {
        type: Number,
        required: function () { return this.is_percentage; }
    },
    is_recurring: {
        type: Boolean,
        default: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    reason: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'completed'],
        default: 'active'
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


export const EmployeeDeduction = mongoose.model("EmployeeDeduction", EmployeeDeductionSchema);



const DeductionLogSchema = new Schema({
    uuid: {
        type: String,
        default: uuid,
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    deduction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDeduction',
        required: true
    },
    payroll_period: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    amount_deducted: {
        type: Number,
        required: true
    },
    deduction_date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

export const DeductionLog = mongoose.model('DeductionLog', DeductionLogSchema);
