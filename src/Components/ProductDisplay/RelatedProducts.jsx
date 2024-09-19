import React, { useEffect, useState } from 'react'
import { get, ref } from 'firebase/database';
import {database} from '../../firebase';
import './productdisplay.css'
function RelatedProducts({category}) {
    const [data,setData] = useState([]); 
    async function getData()
    {
      const reference = ref(database,`${category}/`)
      get(reference).then((snapshot)=>{
        let temp = snapshot.val();
        let res=[];
        Object.values(temp).slice(0, 5).forEach(x => {
            res.push(x);
        });
        setData(res);
        
      }).catch((err)=>console.log(err))

    }
    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[])
  return (
    <div>
        <div className="slideCategoryContainer">
            {data.map((x,i)=>(
              <div className='containpicCategoryAlpha' key={i}>
                <a href={`/Product-Category/${category}/${x.partno}`}><img src={x.url1} alt='#' className='picCategory'/></a>
                <a style={{textDecoration:'none'}} href={`/Product-Category/${category}/${x.partno}`}><h6 className='TextCategory'>{x.name}</h6></a>
                <h5 className='TextCategory'>Rs.{x.price}</h5>
                <div style={{paddingTop:7}}></div>
              </div>
            ))}
        </div>
            
        
      
    </div>
  )
}

export default RelatedProducts
