import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./src/config/db.js"
import routes from './src/routes/index.js';
import { createServer } from 'http';
import { initSocket } from './src/services/socketService.js';

dotenv.config();

const app = express();
const server = createServer(app);
initSocket(server);

app.use(cors());
app.use(cors({origin:["http://localhost:5173","http://localhost:5174"]}))
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());


app.use("/api", routes)

app.listen(process.env.PORT,()=> {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})
