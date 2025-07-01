import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const EmergencyContactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  phone: String,
  email: String,
  address: String,
}, { _id: false })

const EducationSchema = new mongoose.Schema({
  instituteName: String,
  degree: String,
  startDate: Date,
  endDate: Date,
}, { _id: false })

const BankInfoSchema = new mongoose.Schema({
  holderName: String,
  accountNumber: String,
  bankName: String,
  branchName: String,
  swiftCode: String,
}, { _id: false })

const PassportInfoSchema = new mongoose.Schema({
  number: String,
  nationality: String,
  issueDate: Date,
  expiryDate: Date,
}, { _id: false })

const EmployeeDetailSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true },
  
  personal: {
    name: { type: String },
    position: { type: String },
    employeeId: { type: String },
    joinDate: { type: Date },
    phone: { type: String },
    email: { type: String },
    blood: { type: String },
    birthday: { type: Date },
    address: { type: String },
    gender: { type: String },
    profileImage: { type: String },
  },
  department: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "departmentmodels", 
  },

  emergency: {
    primary: EmergencyContactSchema,
    secondary: EmergencyContactSchema,
  },

  education: [EducationSchema],
  experience: [String],
  certificates: [String],
  bank: BankInfoSchema,
  passport: PassportInfoSchema,

  isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model("EmployeeDetail", EmployeeDetailSchema)
