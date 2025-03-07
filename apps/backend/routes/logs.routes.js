import express from 'express';
import { getLogs, createLog, logUpdate, logDelete, shareLog } from "../controllers/logs.controllers.js";
import authMiddleware from '../middlewares/auth.middleware.js'; // Import the auth middleware

const router = express.Router();

// Apply authMiddleware to all routes (this ensures the user must be authenticated for all routes)

// Get logs for the authenticated user
router.get("/", authMiddleware, getLogs);

// Create a new log for the authenticated user
router.post("/", authMiddleware, createLog);

// Update an existing log by its ID (only if it belongs to the authenticated user)
router.put("/:id", authMiddleware, logUpdate);

// Delete a log by its ID (only if it belongs to the authenticated user)
router.delete("/:id", authMiddleware, logDelete);

// Allows a log owner to share a log
router.post("/:id/share", authMiddleware, shareLog);

export default router;
