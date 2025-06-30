import Joi from "joi"

export const EmployeeDetailValidationSchema = Joi.object({

  personal: Joi.object({
    
    name: Joi.string().required(),
    position: Joi.string().required(),
    employeeId: Joi.string().required(),
    joinDate: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    blood: Joi.string().required(),
    birthday: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    profileImage: Joi.string().required(),
  }).required(),

  emergency: Joi.object({
    primary: Joi.object().required(),
    secondary: Joi.object().required(),
  }),

  education: Joi.array().items(Joi.object({
    instituteName: Joi.string().required(),
    degree: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
  })),

  experience: Joi.array().items(Joi.string()),
  certificates: Joi.array().items(Joi.string()),

  bank: Joi.object({
    holderName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    branchName: Joi.string().required(),
    swiftCode: Joi.string().required(),
  }),

  passport: Joi.object({
    number: Joi.string().required(),
    nationality: Joi.string().required(),
    issueDate: Joi.string().required(),
    expiryDate: Joi.string().required(),
  }),
})
