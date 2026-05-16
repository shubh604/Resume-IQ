import "./InsightSection.css"

function InsightSection({title,items,color,symbol}){

   return(

      <div className="insight-section">

         <h2 className="insight-title"><span>{symbol}</span> {title}</h2>

         <div className="insight-list">

            {
               items.map((item,index)=>(

                  <p key={index} className="insight-item">

                     <span style={{color:color,fontWeight:"bold"}} className="insight-bullet">•</span>

                     {" "}

                     {item}

                  </p>

               ))
            }

         </div>

      </div>

   )

}

export default InsightSection;