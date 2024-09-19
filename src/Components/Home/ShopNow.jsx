import React, { useEffect, useState } from 'react'
import {ref,get} from 'firebase/database';
import {database} from '../../firebase';
import { Link } from 'react-router-dom';
import load from '../../Assets/loading.svg'

function ShopNow() {
    const [data, setData] = useState([]);
    const category = ['Finials', 'Brackets', 'TieHooks', 'Rods', 'Sliders', 'Hinges', 'DLocks', 'SLegs', 'DHardW'];
    const [loadState,setLoadState] = useState(true);
    const getData = async (cat) => {
      const reference = ref(database, `${cat}/123456`);
      const snapshot = await get(reference);
      if (snapshot.exists()) {
        if(snapshot.val().stock){
          return snapshot.val();
        }
      }
      return null;
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const promises = category.map(cat => getData(cat));
          const results = await Promise.all(promises);
          const filteredResults = results.filter(result => result !== null); // Remove null values if any
          setData(filteredResults);
          setLoadState(false);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
      // eslint-disable-next-line
    }, []);
  return (
    <div>
      {loadState?<div style={{justifyContent:'center',display:'flex'}}><img src={load} alt='#' width={60}/></div>:<></>}
        <div className='GridProductCatalog'>
            {data.map((x,i)=>(
              <div key={i}>
                <div style={{justifyContent:'center',display:'flex'}}>
                    <div className='containpicCategory'>
                        <Link to={`/Product-Category/${category[i]}/${x.partno}`}><img src={x.url1} alt='#' className='picCategory'/></Link>
                        <Link style={{textDecoration:'none'}} to={`/Product-Category/${category[i]}/${x.partno}`}><h6 style={{paddingTop:20}} className='TextCategory'>{x.name}</h6></Link>
                        <h5 className='TextCategory'  style={{color:'#FA8241'}}>Rs.{x.price}</h5>
                        <div style={{paddingTop:7}}></div>
                    </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ShopNow
