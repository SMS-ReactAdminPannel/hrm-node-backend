import { AdminForgotPasswordValidate, AdminLoginValidate, AdminResetPasswordValidate, AdminSchemavalidate } from "./Admin/Auth/index.js";
import { employeeValidationSchema } from "./Employee/index.js";
import { EmployeeDetailValidationSchema } from "./Employeedetail/Auth/index.js";
import { Guestschemavalidate } from "./Guest/Auth/index.js";
import { HrSchemavalidate } from "./HR/auth/index.js";
import { LeaveValidateSchema } from "./LeaveManagement/index.js";
import { notificationValidationSchema } from "./Notification/Auth/index.js";

const Validations = {
    employeeValidationSchema: employeeValidationSchema,
    Guestauth: Guestschemavalidate,
    AdminShemaValidate: AdminSchemavalidate,
    AdminLoginValidate: AdminLoginValidate,
    AdminForgotPasswordValidate: AdminForgotPasswordValidate,
    AdminResetPasswordValidate: AdminResetPasswordValidate,
    LeaveValidateSchema:LeaveValidateSchema,
    Hrschemavalidate: HrSchemavalidate,
    NotificationValidate: notificationValidationSchema,
    EmpolyeeDetailValidation:EmployeeDetailValidationSchema

}

export default Validations;