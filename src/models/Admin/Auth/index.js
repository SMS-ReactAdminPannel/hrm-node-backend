import mongoose from "mongoose";
import validator from "validator";                                          

// Define Admin schema
const AdminSchema = new mongoose.Schema({
  id: {
    type: String,

  },
  uuid: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message: (props) => `Password is too weak: ${props.value}`,
    },
  },
  phonenumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, 'en-IN');
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: (props) => `Invalid email: ${props.value}`,
    },
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
  },
  image: {
    type: String,
    default: null,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  is_delete: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_two_auth_completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_two_auth_completed_at: {
    type: Date,
    default: null,
  },
  is_email_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  first_time_login: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Export model
export const AdminModel = mongoose.model("Admin", AdminSchema);
