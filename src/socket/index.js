import {
  socketCreateNotification,
  socketGetNotifications,
  socketGetNotificationById,
  socketUpdateNotificationById,
} from "./controllers/Notification/Auth/index.js";

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("notification:create", (data, cb) =>
    socketCreateNotification(data, cb)
  );

  socket.on("notification:get", (data, cb) =>
    socketGetNotifications(data, cb)
  );

  socket.on("notification:getWithId", (data, cb) =>
    socketGetNotificationById(data, cb)
  );

  socket.on("notification:updateWithId", (data, cb) =>
    socketUpdateNotificationById(data, cb)
  );
});
