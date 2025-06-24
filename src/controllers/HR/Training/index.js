import { CreatedProgramTraining } from "../../../models/HR/Training/index.js";

// Create Training Program
export const CreatedTProgram = async (req, res) => {
  try {
    const { title, category, duration, instructor, startDate, enrolled = 0, completed = 0, rating = 0, status = "active" } = req.body;

    const createdptraining = new CreatedProgramTraining({
      title,
      category,
      duration,
      instructor,
      startDate,
      enrolled,
      completed,
      rating,
      status,
    });

    await createdptraining.save();

    return res.status(201).send({
      success: true,
      message: "Created Training Program Successfully",
      data: createdptraining,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET All Training Programs
export const showPrograms = async (req, res) => {
  try {
    const allPrograms = await CreatedProgramTraining.find();

    return res.status(200).send({
      success: true,
      message: "Fetched all training programs",
      data: allPrograms,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to fetch programs",
      error: error.message,
    });
  }
};
