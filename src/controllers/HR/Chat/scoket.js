
// const { ChatMessage } = require("../../../models/HR/Chat/index.js");
// const { decodeToken } = require("../../../utils/helpers/helpers.js");

// const connectedUsers = new Map();

// function getPrivateRoom(user1, user2) {
//   return [user1, user2].sort().join("_");
// }

// function configureSocket(io) {
//   // Auth middleware
//   io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     const decoded = decodeToken(token);
//     if (decoded && decoded.uuid) {
//       socket.data.userId = decoded.uuid;
//       return next();
//     }
//     return next(new Error("Authentication error"));
//   });

//   io.on("connection", async (socket) => {
//     const userId = socket.data.userId;
//     connectedUsers.set(userId, socket.id);
//     console.log(`User connected: ${userId}`);

//     // Send undelivered messages
//     const undeliveredMessages = await ChatMessage.find({
//       recipientId: userId,
//       delivered: false,
//     });

//     for (const msg of undeliveredMessages) {
//       socket.emit("newMessage", msg);
//       msg.delivered = true;
//       await msg.save();
//     }

//     // Join room
//     socket.on("joinRoom", (recipientId) => {
//       const room = getPrivateRoom(userId, recipientId);
//       socket.join(room);
//     });

//     // Handle private messages
//     socket.on("privateMessage", async ({ recipientId, content }) => {
//       const room = getPrivateRoom(userId, recipientId);
//       const msg = new ChatMessage({ senderId: userId, recipientId, content });

//       const recipientSocketId = connectedUsers.get(recipientId);
//       if (recipientSocketId) {
//         io.to(room).emit("newMessage", msg);
//         msg.delivered = true;
//       }
//       await msg.save();
//     });

//     // Disconnect cleanup
//     socket.on("disconnect", () => {
//       connectedUsers.delete(userId);
//       console.log(` User disconnected: ${userId}`);
//     });
//   });
// }

// module.exports = { configureSocket };
