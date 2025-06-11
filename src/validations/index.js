import { AdminForgotPasswordValidate, AdminLoginValidate, AdminResetPasswordValidate, AdminSchemavalidate } from "./Admin/Auth/index.js";
import { employeeValidationSchema } from "./Employee/index.js";
import { Guestschemavalidate } from "./Guest/Auth/index.js";
import { notificationValidationSchema } from "./Notification/Auth/index.js";

const Validations = {
    employeeValidationSchema: employeeValidationSchema,
    Guestauth: Guestschemavalidate,
    AdminShemaValidate: AdminSchemavalidate,
    AdminLoginValidate: AdminLoginValidate,
    AdminForgotPasswordValidate: AdminForgotPasswordValidate,
    AdminResetPasswordValidate: AdminResetPasswordValidate,
    NotificationValidate: notificationValidationSchema

}

export default Validations;