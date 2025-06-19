import express from "express"
import { deleteVisitorById, getAllVisitors, newVisitor, updateVisitorById } from "../../../controllers/VisitorManagement/index.js";

const VisitorRoute = express.Router();

VisitorRoute.post("/",newVisitor)
VisitorRoute.get("/getAll",getAllVisitors)
VisitorRoute.put("/:id",updateVisitorById)
VisitorRoute.delete("/:id",deleteVisitorById)

export default VisitorRoute;