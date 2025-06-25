import { employeeUser } from "../../../models/Employee/index.js";
import { CreatedProgramTraining } from "../../../models/HR/Training/index.js";
import { trainingProgramSchema,addEmployeesSchema } from "../../../validations/Training/Auth/index.js";

//Create Training Program Management
export const CreatedTProgram = async (req, res) => {
  try {
    const { error, value } = trainingProgramSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    const createdptraining = new CreatedProgramTraining(value);
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
    const { value, error } = addEmployeesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    const { employIds } = value;
    const employees = await employeeUser.find({ _id: { $in: employIds } });
    const program = await CreatedProgramTraining.findById(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }
    const existingIds = program.employId
      .filter((e) => e && e._id)
      .map((e) => e._id.toString());
    const newEmployees = employees
      .filter((emp) => !existingIds.includes(emp._id.toString()))
      .map((emp) => ({
        _id: emp._id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        department: emp.department,
      }));
    program.employId.push(...newEmployees);
    await program.save();
    res.status(200).json({
      success: true,
      message: "Employees added to program successfully",
      data: program,
    });
  } catch (error) {
    console.error("Error adding employees:", error);
    res.status(500).json({
      success: false,
      message: "Error adding employees",
      error: error.message || error,
    });
  }
};

//get a program details
export const getProgramById = async (req, res) => {
  try {
    const { programId } = req.params;

    const program = await CreatedProgramTraining.findById(programId);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Training program not found",
      });
    }

    res.status(200).json({
      success: true,
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching program",
      error: error.message || error,
    });
  }
};
