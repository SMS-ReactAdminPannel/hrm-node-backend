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

// get all Training Programs
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


//empolyee adding
export const addEmployeesToProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const { employIds } = req.body;

    const updatedProgram = await CreatedProgramTraining.findByIdAndUpdate(
      programId,
      { $addToSet: { employId: { $each: employIds } } },
      { new: true }
    ).populate("employId");

    res.status(200).json({
      success: true,
      message: "Employees added to program successfully",
      data: updatedProgram,
    });
  } catch (error) {
    console.error("Error in addEmployeesToProgram:", error); 

    res.status(500).json({
      success: false,
      message: "Error adding employees",
      error: error.message || error,
    });
  }
};



