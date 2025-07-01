import mongoose from "mongoose"; 


// Time Entry Schema
const TimeEntrySchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeUser', required: true },
  date: { type: Date, required: true },
  clockIn: { type: Date, default: null},
  clockOut: { type: Date, default: null },
  breakStart: { type: Date },
  breakEnd: { type: Date },
  totalHours: { type: Number },
  regularHours: { type: Number },
  overtimeHours: { type: Number },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  }
}, { timestamps: true });

export const TimeEntryModel = mongoose.model("TimeEntrymodel",TimeEntrySchema)

// Timesheet Schema
const TimesheetSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeUser', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeEntrymodel  ' }],
  totalHours: { type: Number },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeUser' },
  approvalDate: { type: Date },
  rejectionReason: { type: String }
}, { timestamps: true });

export const TimesheetModel = mongoose.model("TimeSheetmodel",TimesheetSchema)
