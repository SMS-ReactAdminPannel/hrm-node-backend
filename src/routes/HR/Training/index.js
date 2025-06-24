
import express from "express";
import { CreatedTProgram, showPrograms } from "../../../controllers/HR/Training/index.js";

const TrainingMangament= express.Router();

TrainingMangament.post('/createtraining',CreatedTProgram)
TrainingMangament.get('/showprogram',showPrograms)




export default TrainingMangament;