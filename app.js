import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./src/config/db.js"
import routes from './src/routes/index.js';
import http  from 'http';
import { initSocket } from './src/services/socketService.js';
import { generateToken } from './src/utils/helpers/helpers.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

 
app.use("/api", routes)

app.listen(process.env.PORT,()=> {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})
