const fs = require("fs");
const PdfParse = require("pdf-parse");
const model = require("../config/gemini");

async function analyzeResumeController(req, res) {
    const pdf = req.file;
    try {
        console.log("controller called!");
        if (!pdf) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded"
            });
        }
        const raw_buffered_data = fs.readFileSync(pdf.path);
        const pdfData = await PdfParse(raw_buffered_data);
        const pdfText = pdfData.text;

        if(!pdfText || pdfText.trim().length < 50){
            return res.status(400).json({
                success: false,
                message: "PDF appears to be empty or unreadable"
            });
        }

        const { jobDescription } = req.body;
        let prompt = "";

        const currentDate = new Date().toISOString().split("T")[0];

        if (jobDescription && jobDescription.trim() !== "") {
            prompt = `
                You are an expert ATS Resume Analyzer.

                Current date: ${currentDate}

                Evaluate the candidate only based on information explicitly present in the resume as of the current date.
                Do not assume future experience, future achievements, future job titles, or future qualifications.

                First, check if the provided document is actually a resume or CV.
                If it is NOT a resume, respond ONLY with this exact JSON: {"error": "not_a_resume"}

                If it IS a resume, compare it with the provided Job Description and respond ONLY in valid JSON format, no extra text, no markdown.

                Important: Every array must have minimum 5 items and maximum 12 items. Do not return any empty arrays.

                {
                    "matchScore": (number 0-100),
                    "atsScore": (number 0-100),
                    "matchedSkills": (array of 5-12 strings),
                    "missingSkills": (array of 5-12 strings),
                    "missingKeywords": (array of 5-12 strings),
                    "strengths": (array of 5-12 strings),
                    "suggestions": (array of 5-12 strings),
                    "bestRoles": (array of 5-8 strings),
                    "scoreBreakdown": {
                        "jobMatch": (number 0-100),
                        "atsCompatibility": (number 0-100),
                        "skillCoverage": (number 0-100),
                        "keywordMatch": (number 0-100)
                    }
                }

                Job Description:
                ${jobDescription}

                Resume Content:
                ${pdfText}
            `;
        } else {
            prompt = `
                You are an expert ATS Resume Analyzer.

                Current date: ${currentDate}

                Evaluate the candidate only based on information explicitly present in the resume as of the current date.
                Do not assume future experience, future achievements, future job titles, or future qualifications.

                First, check if the provided document is actually a resume or CV.
                If it is NOT a resume, respond ONLY with this exact JSON: {"error": "not_a_resume"}

                If it IS a resume, analyze it carefully and respond ONLY in valid JSON format, no extra text, no markdown.

                recommendedSkills should contain skills that would strengthen the candidate's profile based on their current resume and likely career path.
                Recommend skills appropriate to the candidate's current experience level.
                Avoid suggesting advanced enterprise technologies unless strongly relevant.

                Important: Every array must have minimum 5 items and maximum 12 items. Do not return any empty arrays.

                {
                    "atsScore": (number 0-100),
                    "strengths": (array of 5-12 strings),
                    "recommendedSkills": (array of 5-12 strings),
                    "suggestions": (array of 5-12 strings),
                    "bestRoles": (array of 5-8 strings),
                    "formattingFeedback": (array of 5-12 strings),
                    "keywordCoverage": (number 0-100),
                    "technicalAnalysis": {
                        "frontend": (number 0-100),
                        "backend": (number 0-100),
                        "devopsCloud": (number 0-100),
                        "database": (number 0-100),
                        "testingQA": (number 0-100)
                    }
                }

                Resume Content:
                ${pdfText}
            `;
        }

        const result = await model.generateContent(prompt);
        const rawText = result.response.text();
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const parsedResult = JSON.parse(cleaned);

        if(parsedResult.error === "not_a_resume"){
            return res.status(400).json({
                success: false,
                message: "Uploaded PDF does not appear to be a resume"
            });
        }

        res.status(200).json({
            success: true,
            message: "Analysis Successful",
            data: parsedResult
        });
    }
    catch(error){
        console.log("error:", error);
        if(error.status === 503){
            res.status(503).json({
                success: false,
                message: "AI service is busy. Please try again in a moment"
            });}
        else if(error.status === 429){
            res.status(429).json({
                success: false,
                message: "Too many requests. Please try again after some time"
            });
        } else if(error.message?.includes("Invalid PDF") || error.message?.includes("PDF")){
            res.status(400).json({
                success: false,
                message: "Invalid or corrupted PDF file"
            });
        } else if(error instanceof SyntaxError){
            res.status(500).json({
                success: false,
                message: "Failed to parse AI response. Please try again"
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error analyzing resume. Please try again"
            });
        }
    }
    finally {
        if (pdf && fs.existsSync(pdf.path)) {
            fs.unlinkSync(pdf.path);
        }
    }
}

module.exports = analyzeResumeController;