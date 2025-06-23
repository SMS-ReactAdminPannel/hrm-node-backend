import express from 'express';
import { createNotification, getUserNotifications, markAsRead } from '../../../controllers/Notification/index.js';



const notificationRouter = express.Router();

notificationRouter.post('/createNotification', createNotification);
notificationRouter.get('/getNotification/:userId', getUserNotifications);
notificationRouter.patch('/markMessageRead/:id', markAsRead);

export default notificationRouter;