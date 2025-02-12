import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';

import { connectDB } from '../config/db.js';

import logRoutes from "../routes/logs.routes.js";
import userRoutes from "../routes/users.routes.js";
import mentorRoutes from "../routes/mentor.routes";
import menteeRoutes from "../routes/mentee.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json());

app.use("/mentorship/logs", logRoutes)
app.use("/auth", userRoutes)
app.use("/auth", mentorRoutes)
app.use("/auth", menteeRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
