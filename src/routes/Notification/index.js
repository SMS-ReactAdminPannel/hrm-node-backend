import express from 'express';
import notificationAuthRoute from './Auth/index.js';


const notificationRoute = express.Router();
notificationRoute.use('/auth', notificationAuthRoute);

export default notificationRoute;