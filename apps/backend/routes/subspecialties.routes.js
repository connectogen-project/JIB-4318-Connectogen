const express = require("express");
const { getSubspecialties } = require("../controllers/subspecialties.controllers");
const router = express.Router();

router.get("/", getSubspecialties);

export default router;