const express = require("express");
const router = express.Router();

const upload = require("../middleware/multerMiddleware");

const analyzeResumeController = require("../controller/analyzerController");

router.post("/analyze" , upload.single("resume") , analyzeResumeController);


module.exports = router;