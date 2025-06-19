import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from "./src/config/db.js"
import routes from './src/routes/index.js';
import assetRoute from './src/routes/Assets/assetRoutes.js';
import assetCategoryRoute from './src/routes/Assets/assetCategoryRoute.js';
import EmployeeAuthRoutes from './src/routes/Employee/Auth/index.js'
import DepartmentRouter from './src/routes/HR/Department/index.js';
import jobPostingsRoutes from './src/routes/Recruitment/jobposting.js';
import { createServer } from 'http';
import { initSocket } from './src/services/socketService.js';
import { generateToken } from './src/utils/helpers/helpers.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(cors({origin:["http://localhost:5173","http://localhost:5174"]}))
app.use(express.json());


app.use("/api", routes)

//  app.use("/api/assets", assetRoute);
//  app.use("/asset-categories", assetCategoryRoute);
//  app.use("/api/employee", EmployeeAuthRoutes);

//  app.use("/jobs", jobPostingsRoutes);

 ConnectDB().then(() => {
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  });
});
