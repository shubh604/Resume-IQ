import "./TagSection.css"


function TagSection({title,items,color,symbol}){

   return(

      <div className="tag-wrapper">

         <h2 className="title">{title}</h2>

         <div className="tags">

            {
               items.map((item,index)=>(

                  <span className="tag" key={index}  style={{color:color}}>

                     {symbol}{" "}{item}

                  </span>

               ))
            }

         </div>

      </div>

   )

}

export default TagSection;