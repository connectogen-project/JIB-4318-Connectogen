import express from 'express';
import { getMentees } from '../controllers/mentee.controllers.js';

const router = express.Router();

router.get('/mentees', getMentees);

export default router;

