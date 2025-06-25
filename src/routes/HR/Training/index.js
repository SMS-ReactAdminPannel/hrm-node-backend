
import express from "express";
import { addEmployeesToProgram, CreatedTProgram, showPrograms } from "../../../controllers/HR/Training/index.js";

const TrainingMangament= express.Router();

TrainingMangament.post('/createtraining',CreatedTProgram)
TrainingMangament.get('/showprogram',showPrograms)
TrainingMangament.post('/addemplyoee/:programId',addEmployeesToProgram)




export default TrainingMangament;