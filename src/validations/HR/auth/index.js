import Joi from "joi";


export const HrSignupSchema = Joi.object({
  id: Joi.string().optional(),
  uuid: Joi.string().optional(),
  // first_name: Joi.string().required(),
  // last_name: Joi.string().required(),
  // user_name: Joi.string().required(),
  password: Joi.string().required(),
  // phone_number: Joi.string().required(),
  email: Joi.string().email().required(),
  // role: Joi.string().optional().default("HR"),
  // image: Joi.string().optional().default(null),
  // is_active: Joi.boolean().optional().default(true),
  // is_delete: Joi.boolean().optional().default(false),
  // is_two_auth_completed: Joi.boolean().optional().default(false),
  // is_two_auth_completed_at: Joi.date().optional().default(null),
  // is_email_verified: Joi.boolean().optional().default(false),
  // first_time_login: Joi.boolean().optional().default(true),
});

// Export a function that validates with this schema

export const HrSchemavalidate = (data) => {
  const { value, error } = HrSignupSchema.validate(data, { abortEarly: true });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

export const HrSigninValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


export const HRForgotPasswordValidate = Joi.object({
  email: Joi.string().email().required(),
});

export const HRResetPasswordValidate = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});