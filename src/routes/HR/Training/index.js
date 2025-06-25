
import express from "express";
import { addEmployeesToProgram, CreatedTProgram, getProgramById, showPrograms } from "../../../controllers/HR/Training/index.js";

const TrainingMangament= express.Router();

TrainingMangament.post('/createtraining',CreatedTProgram)
TrainingMangament.post('/addemplyoee/:programId',addEmployeesToProgram)
TrainingMangament.get('/showprogram',showPrograms)
TrainingMangament.get('/program/:programId',getProgramById)



export default TrainingMangament;