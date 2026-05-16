import { useLocation} from "react-router-dom";
import WithJDAnalysis from "../WithJDAnalysis/WithJDAnalysis";
import WithoutJDAnalysis from "../WithoutJDAnalysis/WithoutJDAnalysis";

function Analysis() {
    const location = useLocation();
    const { analysis, type } = location.state;

    return (


        <div>
            
            {type === "jd" && <WithJDAnalysis analysis={analysis} />}
            {type === "general" && <WithoutJDAnalysis analysis={analysis} />}
            
        </div>
    )
}

export default Analysis;