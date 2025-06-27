import Joi from "joi";

export const LeaveValidateSchema = Joi.object({
    id: Joi.number(),
    holiday_name: Joi.string(),
    holiday_date: Joi.date(),
    holiday_type: Joi.string(),
    description: Joi.string()
});