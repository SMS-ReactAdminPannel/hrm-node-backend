import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./src/config/db.js";
import routes from './src/routes/index.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api", routes);

const httpServer = createServer(app);
const PORT = process.env.PORT || 3002;



const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true
  }
});



io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    

    io.to(room).emit("systemMessage", {
      sender: "System",
      content: `${socket.id} joined the room`,
      timestamp: new Date().toISOString()
    });
  });


  socket.on("sendMessage", (data) => {
    console.log("verify",data)
    try {
      const { room, sender, content } = data;
      if (!room || !sender || !content) {
        throw new Error("Invalid message data");
      }

      const message = {
        sender,
        content,
        room,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };

      console.log("Broadcasting message to room", room, ":", message);
      io.to(room).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });


  socket.on("typing", (data) => {
    const { room, sender } = data;
    io.to(room).emit("userTypng", { sender, isTyping: true });
  });

  socket.on("stopTyping", (room) => {
    io.to(room).emit("userTyping", { isTyping: false });
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});