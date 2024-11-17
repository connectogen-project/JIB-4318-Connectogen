import express from 'express';

import { getLogs, createLog, logUpdate, logDelete } from "../controllers/logs.controllers.js";

const router = express.Router();

router.get("/", getLogs);

router.post("/", createLog);

router.put("/:id", logUpdate)

router.delete("/:id", logDelete);

export default router;