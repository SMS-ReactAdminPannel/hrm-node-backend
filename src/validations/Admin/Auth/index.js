import Joi from "joi";


export const AdminSignupSchema = Joi.object({
  id: Joi.string().optional(),
  uuid: Joi.string().optional(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  phonenumber: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().optional().default("Admin"),
  image: Joi.string().optional().default(null),
  is_active: Joi.boolean().optional().default(true),
  is_delete: Joi.boolean().optional().default(false),
  is_two_auth_completed: Joi.boolean().optional().default(false),
  is_two_auth_completed_at: Joi.date().optional().default(null),
  is_email_verified: Joi.boolean().optional().default(false),
  first_time_login: Joi.boolean().optional().default(true),
});


export const AdminSchemavalidate = (data) => {
  const { value, error } = AdminSignupSchema.validate(data, { abortEarly: true });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

export const AdminLoginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
