import Joi from "joi";
import mongoose from "mongoose";

export const trainingProgramSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.string().required(),
  instructor: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  enrolled: Joi.number().min(0).default(0),
  completed: Joi.number().min(0).default(0),
  rating: Joi.number().min(0).max(5).default(0),
  status: Joi.string().valid("active", "completed").default("active"),
  employId: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          }, "ObjectId Validation")
          .required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        department: Joi.string().required(),
      })
    )
    .default([]),
});
