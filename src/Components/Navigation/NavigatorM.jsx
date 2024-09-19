import React, { useState,useEffect } from 'react'
import './nav.css';
function NavigatorM({layout}) {
    const[click,setClick]=useState(false);
    const[action,setAction]=useState([]);
    const [link,setLink]=useState([]);
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
      <h6 onClick={()=>{setClick(!click)}}>{layout} {click?'—':'+'}</h6>
      {click?
        <div className='navOpenPanel'>
            {action.map((x,i)=>(
                <a key={i} style={{textDecoration:'none'}} href={link[i]}><h6>{x}</h6></a>
            ))}
        </div>:
        <div></div>
      }
    </div>
  )
}

export default NavigatorM
