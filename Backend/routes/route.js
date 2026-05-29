const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/multerMiddleware");
const analyzeResumeController = require("../controller/analyzerController");

router.post(
    
    "/analyze", 
    

    (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: err.code === "LIMIT_FILE_SIZE" ? "File too large. Max 5MB allowed" : err.message
            });
        }
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
    }, 


    analyzeResumeController

);

module.exports = router;