import mongoose from "mongoose";

const GuestAuthSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    token: { type: String, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, default: "guest" },
    uuid: { type: String, default: generateUUID },
    is_active: { type: Boolean, default: true },
    is_delete: { type: Boolean, default: false },
    is_two_auth_completed: { type: Boolean, default: false },
    is_email_verified: { type: Boolean, default: false },
    first_time_login: { type: Boolean, default: true },
    is_two_auth_completed_at: { type: Date, default: null }
})

export const Guest = mongoose.model("Guest",GuestAuthSchema)