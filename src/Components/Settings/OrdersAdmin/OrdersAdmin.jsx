import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import './ordersadmin.css';
import {get,ref} from 'firebase/database';
import {database} from '../../../firebase';
import { IoIosArrowDown } from "react-icons/io";
import OrderOpenPanel from './OrderOpenPanel';
//import OrderOpenPanel from './OrderOpenPanel';
function OrdersAdmin() {
  const [orderno,setOrderno]=useState([]);
  const [OPI,setOPI] = useState(null);
  useEffect(()=>{
    const reference = ref(database,'Orders');
    get(reference).then((snapshot)=>{
      setOrderno(Object.keys(snapshot.val()));
    })
    .catch(err=>console.log(err));

  },[])

  const OPIHandle=(index)=>{
    setOPI(OPI===index?null:index);
  }

  return (
    <div>
      <Container>
        <div style={{textAlign:'center',paddingTop:50}}>
          <h1 style={{fontWeight:'bolder'}}>Orders</h1>
        </div>
        <div style={{paddingTop:50}}></div>
        {orderno.map((x,i)=>(
          <div key={i} >
            <div className='shaftplateOrder' onClick={()=>{OPIHandle(i)}}>
              <h5 style={{width:'100%'}}>{x}</h5>
              <div style={{textAlign:'right',width:'100%',paddingRight:10}}>
                <IoIosArrowDown fontSize={20}/>
              </div>
            </div>
            <div style={{paddingTop:10}}></div>
            {OPI===i?
              <div>
                <OrderOpenPanel orderno={x}/>
              </div>:
              <></>
            }
          </div>
        ))}

      </Container>
    </div>
  )
}

export default OrdersAdmin
