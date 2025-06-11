import express from 'express';
import {createNotification, getAllNotifications, getReadNotifications, getUnreadNotifications} from '../../../controllers/Notification/Auth/index.js';

const notificationAuthRoute = express.Router();

notificationAuthRoute.post('/createNotification', createNotification);
notificationAuthRoute.get('/getAllNotification', getAllNotifications);
notificationAuthRoute.get('/getReadNotification', getReadNotifications);
notificationAuthRoute.get('/getUnreadNotification', getUnreadNotifications);

export default notificationAuthRoute;