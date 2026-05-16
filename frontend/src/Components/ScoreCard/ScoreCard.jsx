import {CircularProgressbar,buildStyles}from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ScoreCard.css"

function ScoreCard({score,label,color}){

   return(

      <div className="score-card">

         <CircularProgressbar className="progressBar" value={score} text={`${score}%`} styles={buildStyles
                                                                                             (
                                                                                             {pathColor: color,textColor: color, trailColor:"#2a2a2a"}
                                                                                             )
                                                                                             }

         />

         <div className="label"><h2 >{label}</h2></div>
         

      </div>

   )

}

export default ScoreCard;