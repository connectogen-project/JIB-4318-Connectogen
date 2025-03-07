const express = require("express");
const router = express.Router();
const { getDegrees } = require("../controllers/degrees.controller");

router.get("/", getDegrees);

export default router;