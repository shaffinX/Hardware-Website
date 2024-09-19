import React, { useEffect, useState } from 'react'
import { get, ref } from 'firebase/database';
import {database} from '../../firebase';
import { Link } from 'react-router-dom';
import './productdisplay.css'
function RelatedProductsT({category}) {
    const [data,setData] = useState([]); 
    async function getData(store,type)
    {
      const reference = ref(database,`${store}/`)
      get(reference).then((snapshot)=>{
        let temp = snapshot.val();
        let alpha=[];
        Object.values(temp).slice(0, 5).forEach(x => {
            alpha.push(x);
        });
        let res=[];
        for (let i = 0; i < alpha.length; i++) {
            if(alpha[i].type===type){
                res.push(alpha[i]);
            }            
        }
        setData(res);
        
      }).catch((err)=>console.log(err))

    }
    useEffect(()=>{
        if(category==='Cabinet Handles'){
            getData('Handles','cabinet');
        }
        if(category==='Drawer Handles'){
            getData('Handles','drawer');
        }
        if(category==='Main Door'){
            getData('CHandles','main gate');
        }
        if(category==='Main Gate'){
            getData('CHandles','main door');
        }
      // eslint-disable-next-line
    },[])
  return (
    <div>
    <div className="slideCategoryContainer">
        {data.map((x,i)=>(
            <div className='containpicCategoryAlpha' key={i}>
                <Link to={`/Product-Category-t/${category}/${x.partno}`}><img src={x.url1} alt='#' className='picCategory'/></Link>
                <Link style={{textDecoration:'none'}} to={`/Product-Category-t/${category}/${x.partno}`}><h6 className='TextCategory'>{x.name}</h6></Link>
                <h5 className='TextCategory'>Rs.{x.price}</h5>
                <div style={{paddingTop:7}}></div>
            </div>
        ))}
    </div>
        
    
  
</div>
  )
}

export default RelatedProductsT
