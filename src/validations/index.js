import { employeeValidationSchema } from "./Employee";
import { Guestschemavalidate } from "./Guest/Auth";

const Validations = {
    employeeValidationSchema:employeeValidationSchema,
    Guestauth: Guestschemavalidate
}

export default Validations;