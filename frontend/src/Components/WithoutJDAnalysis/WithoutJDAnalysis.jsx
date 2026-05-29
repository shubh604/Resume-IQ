import ScoreCard from "../ScoreCard/ScoreCard";
import StatsCard from "../StatsCard/StatsCard";
import TagSection from "../TagSection/TagSection";
import InsightSection from "../InsightSection/InsightSection";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./WithoutJDAnalysis.css"
import { useNavigate } from "react-router-dom";

function WithoutJDAnalysis(props){

    const a = props.analysis;

    const withoutJDStats = [
  { number: a.strengths.length, label: "Strengths", sublabel: "detected", color: "var(--green)" },
  { number: a.recommendedSkills.length, label: "Recommended Skills", sublabel: "to add", color: "var(--red)" },
  { number: a.suggestions.length, label: "Suggestions", sublabel: "improvements", color: "var(--yellow)" },
  { number: a.bestRoles.length, label: "Best Roles", sublabel: "matched", color: "var(--blue)" },
  { number: a.formattingFeedback.length, label: "Format Tips", sublabel: "feedback", color: "var(--accent)" },
  { number: `${a.keywordCoverage}%`, label: "Keyword Coverage", sublabel: "technical fit", color: "var(--yellow)" },
]

    function scoreColor(score){

        if(score>=70){return "#22c55e";}
        else if(score>=40){return "#f59e0b";}
        else{ return "#ef4444"; }

    }
    
    const navigate = useNavigate();
    return (
    <div className="withoutjd-page main-container">
        <div className="withoutJDBody">

            <div className="analysis-header">
                <h1 className="analysis-title">ResumeIQ</h1>
                <p className="analysis-subtitle">Your AI-powered analysis is ready</p>
            </div>
       
            <div className="row1">
                <div className="ats-score-wrapper">
                    <ScoreCard score={a.atsScore} label="ATS Score" color={scoreColor(a.atsScore)} />
                </div>
                <div className="stats-grid">
                    {withoutJDStats.map((card, index) => (
                        <div  className="stats-card"> <StatsCard key={index} {...card} /> </div>
                    ))}
                </div>
            </div>

            <div className="row2">
                <div className="strengths section-card">
                    <TagSection title="Strengths" items={a.strengths} color="var(--green)" symbol="✓" />
                </div>
            </div>
        
            <div className="row3">
                <div className="missing-skills section-card">
                    <TagSection title="Recommended Skills" items={a.recommendedSkills} color="var(--red)" symbol="★" />
                </div>
            </div>
        
            <div className="row4">
                <div className="best-matching-roles section-card">
                    <TagSection title="Best Matching Roles" items={a.bestRoles} color="var(--blue)" symbol="◆" />
                </div>
            </ div>
    
            <div className="row5">
                <div className="suggestions">
                    <InsightSection title="Suggestions" items={a.suggestions} color="var(--yellow)" symbol="💡" />
                </div>
                <div className="technical-analysis">
                    <div className="section-card pb">
                        <h3 className="techanalysisfont">Technical Analysis</h3>
                        <ProgressBar label="Frontend" value={a.technicalAnalysis.frontend} color="#a855f7" />
                        <ProgressBar label="Backend / APIs" value={a.technicalAnalysis.backend} color="#22c55e" />
                        <ProgressBar label="DevOps / Cloud" value={a.technicalAnalysis.devopsCloud} color="#ef4444" />
                        <ProgressBar label="Database" value={a.technicalAnalysis.database} color="#60a5fa" />
                        <ProgressBar label="Testing / QA" value={a.technicalAnalysis.testingQA} color="#f59e0b" />
                    </div>
                </div>
            </div>
     

            <div className="row6 ">
                <div className="section-card">
                    <TagSection title="Format Feedback" items={a.formattingFeedback} color="var(--accent)" symbol="◆" />
                </div>
            </div>

            <div className="anotherdiv">
                <button className="another" onClick={() => navigate("/")}>Analyze Another Resume</button>
            </div>
                
                
        </div>       
    </div>
);

}

export default WithoutJDAnalysis;