import express from "express";
import {
  DepartmentCreate,
  DepartmentUpdateWithUUID,
  DepartmentGetOne,
  DepartmentGetAll,
  DepartmentDelete,
} from "../../../controllers/HR/Department/index.js";

const DepartmentRouter = express.Router();


DepartmentRouter.post("/create", DepartmentCreate);
DepartmentRouter.put("/update/:id", DepartmentUpdateWithUUID);
DepartmentRouter.get("/get/:id", DepartmentGetOne);
DepartmentRouter.get("/getall", DepartmentGetAll);
DepartmentRouter.delete("/delete/:id", DepartmentDelete);


// console.log("✅ DepartmentRouter is mounted");


export default DepartmentRouter;
