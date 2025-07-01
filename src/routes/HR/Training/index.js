import express from "express";
import {
  addEmployeesToProgram,
  CreatedTProgram,
  getProgramById,
  showPrograms,
} from "../../../controllers/HR/Training/index.js";

const TrainingMangamentRouter = express.Router();

TrainingMangamentRouter.post("/createtraining", CreatedTProgram);
TrainingMangamentRouter.post("/addemplyoee/:programId", addEmployeesToProgram);
TrainingMangamentRouter.get("/getall", showPrograms);
TrainingMangamentRouter.get("/program/:programId", getProgramById);

export default TrainingMangamentRouter;
