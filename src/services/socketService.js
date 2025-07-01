
import { Server } from "http";
import { ChatMessage } from "../models/HR/Chat/index.js";
import { decodeToken } from "../utils/helpers/helpers.js";

let io;
const connectedUsers = new Map();

const getPrivateRoom = (user1, user2) => {
  return [user1, user2].sort().join("_");
};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ["GET", "POST", "UPDATE"]
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const decoded = decodeToken(token);
    if (decoded && decoded.uuid) {
      socket.data.userId = decoded.uuid;
      return next();
    }
    return next(new Error("Authentication error"));
  });

  io.on('connection', async (socket) => {
    const userId = socket.data.userId;
    connectedUsers.set(userId, socket.id);
    console.log(`User connected: ${userId}`);

    socket.join(userId); // join user personal notification room

    // Send undelivered messages
    const undelivered = await ChatMessage.find({ recipientId: userId, delivered: false });
    for (const msg of undelivered) {
      socket.emit("newMessage", msg);
      msg.delivered = true;
      await msg.save();
    }

    // Join private chat room
    socket.on("joinRoom", (recipientId) => {
      const room = getPrivateRoom(userId, recipientId);
      socket.join(room);
    });

    // Send private message
    socket.on("privateMessage", async ({ recipientId, content }) => {
      const room = getPrivateRoom(userId, recipientId);
      const msg = new ChatMessage({ senderId: userId, recipientId, content });

      const recipientSocketId = connectedUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(room).emit("newMessage", msg);
        msg.delivered = true;
      }

      await msg.save();
    });

    // Cleanup
    socket.on('disconnect', () => {
      connectedUsers.delete(userId);
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
