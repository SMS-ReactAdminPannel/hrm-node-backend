import Joi from "joi";

export const notificationValidationSchema = Joi.object({
    company_name: Joi.string(),
    notification_type: Joi.string(),
    message: Joi.string(),
    time: Joi.date(),
    is_read: Joi.boolean(),
    is_deleted: Joi.boolean()
});