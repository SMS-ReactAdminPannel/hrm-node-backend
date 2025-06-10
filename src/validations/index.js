import { employeeValidationSchema } from "./Employee";
import { LeaveValidateSchema } from "./LeaveManagement";

const Validations = {
    employeeValidationSchema:employeeValidationSchema,
    LeaveValidateSchema:LeaveValidateSchema
}

export default Validations;