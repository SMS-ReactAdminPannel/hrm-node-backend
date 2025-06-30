import express from "express"
import AdminRouter from "./Admin/index.js";
import EmployeeRouter from "./Employee/index.js";
import GuestRouter from "./Guest/index.js";
import HRRouter from "./HR/index.js";


const routes = express.Router();

routes.use("/admin", AdminRouter);
routes.use("/hr", HRRouter);
routes.use("/employee",EmployeeRouter );
routes.use("/guest", GuestRouter);





export default routes;