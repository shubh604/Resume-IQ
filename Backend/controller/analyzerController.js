const fs = require("fs");
const PdfParse = require("pdf-parse");
const model = require("../config/gemini");

async function analyzeResumeController(req, res) {

    try{
        const pdf = req.file;
        if (!pdf) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded"
            });
        }
        const raw_buffered_data = fs.readFileSync(pdf.path);
        const pdfData = await PdfParse(raw_buffered_data);
        const pdfText = pdfData.text;

        const { jobDescription } = req.body;
 
        console.log(model);
        let prompt = "";

        // if job description exists
        if (jobDescription && jobDescription.trim() !== "") {

            prompt = `
                You are an expert ATS Resume Analyzer.
                Compare the following resume with the provided Job Description.
                Respond ONLY in valid JSON format, no extra text, no markdown.
                Important: Every array must have at least 2-4 items. Do not return any empty arrays.
                {
                "matchScore": (number 0-100),
                "atsScore": (number 0-100),
                "matchedSkills": (array of strings),
                "missingSkills": (array of strings),
                "missingKeywords": (array of strings),
                "strengths": (array of strings),
                "suggestions": (array of strings),
                "bestRoles": (array of strings),
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
        }
        // if no job description
        else {

            prompt = `
            You are an expert ATS Resume Analyzer.
            Analyze the following resume carefully.
            Respond ONLY in valid JSON format, no extra text, no markdown.
            Important: Every array must have at least 2-4 items. Do not return any empty arrays.
            {
            "atsScore": (number 0-100),
            "strengths": (array of strings),
            "missingSkills": (array of strings),
            "suggestions": (array of strings),
            "bestRoles": (array of strings),
            "formattingFeedback": (array of strings),
            "keywordMatch": (number 0-100),
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

        fs.unlinkSync(pdf.path);

        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const parsedResult = JSON.parse(cleaned);

        res.json({
            success: true,
            data: parsedResult
        });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error analyzing resume"
        })
    }

}

module.exports = analyzeResumeController;