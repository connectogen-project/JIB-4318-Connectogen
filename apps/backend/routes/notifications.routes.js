const express = require('express');
const router = express.Router();
const {
    createNotification,
    getNotification,
    readNotification,
    deleteNotification,
} = require('../controllers/notifications.controllers');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/createNotif', createNotification);

router.get('/getNotif', getNotification);

router.put('/read/:id', readNotification);

router.delete('/delNotif/:id', deleteNotification);

export default router;