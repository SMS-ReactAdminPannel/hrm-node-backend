import express from "express"
import { createGrievance, getAllGrievances, updateGrievanceStatus } from "../../../controllers/HR/Grievance/index.js";


const GrievanceRouter = express.Router();
GrievanceRouter.get("/create",createGrievance)
GrievanceRouter.get("/getall",getAllGrievances)
GrievanceRouter.patch("/:id/status", updateGrievanceStatus);
export default GrievanceRouter