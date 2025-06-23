import Joi from "joi";

 export const Guestschemavalidate = Joi.object({
    email: Joi.string(),
    otp: Joi.string(),
    token: Joi.string(),
    id: Joi.string(),
    password: Joi.string(),
    phoneNumber: Joi.string(),
    firstName: Joi.string(),
    lastname: Joi.string(),
    role: Joi.string(),
    uuid: Joi.string(),
    is_active: Joi.boolean(),
    is_delete: Joi.boolean(),
    is_two_auth_completed: Joi.boolean(),
    is_email_verified: Joi.boolean(),
    first_time_login: Joi.boolean(),
    is_two_auth_completed_at: Joi.date(),
})


