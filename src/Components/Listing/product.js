import React from 'react'
import './listing.css';
import { Link } from 'react-router-dom';
function Product({datum,category}) {
  return (
    <div style={{justifyContent:'center',display:'flex'}}>
        <div className='containpicCategory'>
            <Link to={`/Product-Category/${category}/${datum.partno}`}><img src={datum.url1} alt='#' className='picCategory'/></Link>
            <Link style={{textDecoration:'none'}} to={`/Product-Category/${category}/${datum.partno}`}><h6 style={{paddingTop:20}} className='TextCategory'>{datum.name}</h6></Link>
            <h5 className='TextCategory' style={{color:'#FA8241'}}>Rs.{datum.price}</h5>
            <div style={{paddingTop:7}}></div>
        </div>
    </div>
  )
}

export default Product
