import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import routes from "./src/routes/index.js"
import  connectDB from "./src/config/db.js";
import { Message } from "./src/models/HR/ChatApp/index.js" 

dotenv.config()

const app = express()
app.use(cors())
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }))
app.use(express.json())

app.use("/api", routes)

// Create HTTP server
const server = http.createServer(app)

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
})

const users = {}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', async ({ room, sender, content }) => {
    const newMessage = new Message({ room, sender, content });
    await newMessage.save();
    io.to(room).emit('receiveMessage', newMessage);
  });

  socket.on('typing', ({ room, sender }) => {
    socket.to(room).emit('typing', sender);
  });

  socket.on('stopTyping', (room) => {
    socket.to(room).emit('stopTyping');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
server.listen(3002, () => console.log('Server running on port 3002'));