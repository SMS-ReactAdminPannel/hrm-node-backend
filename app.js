import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from "./src/config/db.js"
import routes from './src/routes/index.js';
import assetRoutes from './src/routes/Assets/assetRoutes.js';
import assetCategoryRoute from './src/routes/AssetCategoryRoutes.js';
import EmployeeAuthRoutes from './src/routes/Employee/index.js';
import DepartmentRouter from './src/routes/Deparment/departmentRoutes.js';
import jobPostingsRoutes from './src/routes/Recruitment/jobposting.js';

dotenv.config();
const app = express();



app.use(cors());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))
app.use(express.json());

app.use("/api", routes)

 app.use("/api/assets", assetRoutes);
 app.use("/asset-categories", assetCategoryRoute);
 app.use("/api/employee", EmployeeAuthRoutes);
 app.use("/api/departments", DepartmentRouter);

 app.use("/jobs", jobPostingsRoutes);

 ConnectDB().then(() => {
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  });
});
