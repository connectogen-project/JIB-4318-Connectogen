import express from 'express';
import { getMentors } from '../controllers/mentor.controllers.js';

const router = express.Router();

router.get('/getMentors', getMentors);

export default router;

