import ScoreCard from "../ScoreCard/ScoreCard";
import StatsCard from "../StatsCard/StatsCard";
import TagSection from "../TagSection/TagSection";
import InsightSection from "../InsightSection/InsightSection";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./WithJDAnalysis.css";
import { useNavigate } from "react-router-dom";

function WithJDAnalysis(props){

    const a = props.analysis;

    const withJDStats = [
        { number: a.matchedSkills.length, label: "Matched Skills", sublabel: "found in resume", color: "var(--green)" },
        { number: a.missingSkills.length, label: "Missing Skills", sublabel: "not detected", color: "var(--red)" },
        { number: a.missingKeywords.length, label: "Missing Keywords", sublabel: "add to resume", color: "var(--yellow)" },
        { number: a.bestRoles.length, label: "Best Roles", sublabel: "matched", color: "var(--blue)" },
    ];

    function scoreColor(score) {
        if (score >= 70) return "#22c55e";
        else if (score >= 40) return "#f59e0b";
        else return "#ef4444";
    }

    const navigate = useNavigate();

    return (
        <div className="withjd-page main-container">
            <div className="withJD-body" >

                 <div className="analysis-header">
                    <h1 className="analysis-title">ResumeIQ</h1>
                    <p className="analysis-subtitle">Your AI-powered analysis is ready</p>
                </div>

                <div className="row1">
                    <div className="match-score-wrapper">
                        <ScoreCard score={a.matchScore} label="Match Score" color={scoreColor(a.matchScore)} />
                    </div>
                    <div className="ats-score-wrapper">
                        <ScoreCard score={a.atsScore} label="ATS Score" color={scoreColor(a.atsScore)} />
                    </div>
                    <div className="stats-grid">
                        {withJDStats.map((card,index)=>(
                            <div className="stats-card">
                            <StatsCard
                                key={index}
                                {...card}
                                />
                            </div>
                        ))}
                    </div>
                </div>

           
                    
                <div className="row2">
                    <TagSection title="Matched Skills" items={a.matchedSkills} color="var(--green)" symbol="✓" />
                    <TagSection title="Missing Skills" items={a.missingSkills} color="var(--red)" symbol="✗" />
                </div>

                <div className="row3">
                <TagSection title="Missing Keywords" items={a.missingKeywords} color="var(--yellow)" symbol="◆" />
                <TagSection title="Best Matching Roles" items={a.bestRoles} color="var(--blue)" symbol="◆" />
                </div>

                <div className="row4">
                
                    <InsightSection title="Strengths" items={a.strengths} color="var(--green)" symbol="✓" />
                    <InsightSection title="Suggestions" items={a.suggestions} color="var(--yellow)" symbol="💡" />
                </div>

                <div className="section-card progressbar">
                    <h3>Score Breakdown</h3>
                    <ProgressBar label="Job Match" value={a.scoreBreakdown.jobMatch} color="#22c55e" />
                    <ProgressBar label="ATS Compatibility" value={a.scoreBreakdown.atsCompatibility} color="#a855f7" />
                    <ProgressBar label="Skill Coverage" value={a.scoreBreakdown.skillCoverage} color="#60a5fa" />
                    <ProgressBar label="Keyword Match" value={a.scoreBreakdown.keywordMatch} color="#f59e0b" />
                </div>

                <div className="anotherdiv">
                    <button className="another" onClick={() => navigate("/")}>Analyze Another Resume</button>
                </div>

            </div>
        </div>
    );
}

export default WithJDAnalysis;