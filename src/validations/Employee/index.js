import Joi from "joi";

export const employeeValidationSchema = Joi.object({
    id: Joi.number(),
    uuid: Joi.number(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    phone_number: Joi.number(),
    email: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
    image: Joi.string().optional(),
})