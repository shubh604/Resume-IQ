# ResumeIQ 🎯

An AI-powered ATS Resume Analyzer built with React, Node.js, Express, and Google Gemini API.  
Upload your resume and receive instant AI-driven insights, ATS-style scoring, skill gap analysis, and personalized improvement suggestions.

---

## Features

- Upload PDF resumes for automated ATS analysis
- Match resumes against a job description for skill gap analysis
- AI-generated strengths and improvement suggestions
- Matched and missing skills with color-coded badges
- ATS score breakdown with animated progress bars
- Technical proficiency analysis
- Resume formatting feedback
- Drag and drop file upload interface
- Real-time loading state with animated spinner
- Responsive modern dashboard UI

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Circular Progressbar
- CSS3

### Backend
- Node.js
- Express.js
- Multer
- pdf-parse

### AI Integration
- Google Gemini API
- Structured JSON prompting for conditional resume analysis

---

## How It Works
1. User uploads a PDF resume via drag & drop or file browser, and optionally provides a job description
2. Multer temporarily stores the uploaded file on disk
3. `pdf-parse` extracts text content from the PDF
4. Temporary file is deleted immediately using `fs.unlinkSync`
5. Extracted text is sent to the Gemini API with a conditional structured prompt
6. Gemini returns a structured JSON response
7. Results are displayed through an interactive analytics dashboard

---

## Local Setup

### Clone the repository

```bash
git clone <your-repository-url>
```

---

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
GEMINI_API_KEY=your_api_key
```

Start the backend server:

```bash
node index.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Future Improvements

- Resume history tracking
- Resume keyword optimization
- Downloadable analysis reports
- Dark/light theme toggle
- Deployment and cloud storage support

---

## Author

**Shubhdeep Kaur**
