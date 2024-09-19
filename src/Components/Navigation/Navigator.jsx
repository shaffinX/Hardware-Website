import React, { useEffect, useState } from 'react'

function Navigator({layout}) {
  const [link,setLink]=useState([]);
  const[action,setAction]=useState([]);
  useEffect(()=>{
    if(layout==='CURTAIN HARDWARE'){
      setAction(['Finials','Brackets','Tie Hooks','Rods']);
      setLink(['/Product-Category/Finials','/Product-Category/Brackets','/Product-Category/TieHooks','/Product-Category/Rods']);
    }
    if(layout==='FURNITURE HARDWARE'){
      setAction(['Cabinet Handles','Drawer Handles','Drawer Sliders','Hinges','Drawer Locks','Sofa Legs']);
      setLink(['/Product-Category-t/Cabinet Handles','/Product-Category-t/Drawer Handles','/Product-Category/Sliders','/Product-Category/Hinges','/Product-Category/DLocks','/Product-Category/SLegs'])
    }
    if(layout==='CUSTOMIZE HANDLES'){
      setAction(['Main Door','Main Gate']);
      setLink(['/Product-Category-t/Main Door','/Product-Category-t/Main Gates'])
    }
    
    // eslint-disable-next-line
  },[])
  return (
    <div>
        <div class="dropdown">
            <h5 class="dropdown-toggle" type="button" data-bs-toggle="dropdown" >
              {layout}
            </h5>
            <ul class="dropdown-menu">
              {action.map((x,i)=>(
                <li key={i}><a class="dropdown-item" href={`${link[i]}`}>{x}</a></li>
              ))}
                
            </ul>  
        </div>
      
    </div>
  )
}

export default Navigator
