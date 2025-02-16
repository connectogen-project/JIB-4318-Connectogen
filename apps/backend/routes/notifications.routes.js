const express = require('express');
const router = express.Router();
const {
    createNotification,
    getNotification,
    readNotification,
} = require('../controllers/notifications.controllers');

router.post('/createNotif', createNotification);

router.get('/getNotif', getNotification);

router.put('/read/:id', readNotification);

export default router;