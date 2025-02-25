import express from 'express';
import { getLogs, createLog, logUpdate, logDelete } from "../controllers/logs.controllers.js";
import authMiddleware from '../middlewares/auth.middleware.js'; // Import the auth middleware

const router = express.Router();

// Apply authMiddleware to all routes
router.get("/", authMiddleware, getLogs);
router.post("/", authMiddleware, createLog);
router.put("/:id", authMiddleware, logUpdate);
router.delete("/:id", authMiddleware, logDelete);

export default router;