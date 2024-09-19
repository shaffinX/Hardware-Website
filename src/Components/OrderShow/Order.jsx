import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {get,ref, remove} from 'firebase/database';
import {database} from '../../firebase';
import './ordershow.css';
import Tick from '../../Assets/tick.gif';
function Order() {
    const [cart,setCart]=useState([]);
    const [data,setData]=useState({});
    const [enter,setEnter]=useState(true);
    const [total,setTotal] = useState(0);
    const [delivery,setDeli] = useState(1);
    const [track,setTrack] = useState(0);
    const {orderno}=useParams();
    const [status,setStatus]=useState(false);
    const GetCart=()=>{
        const reference = ref(database,'Orders/'+orderno+'/cart');
        get(reference).then((snapshot)=>{
            if(snapshot.exists()){
                setCart(snapshot.val());
            }
            else{
                setEnter(false);
            }
        }).catch(err=>console.log(err))
    }
    const getData=()=>{
        const reference = ref(database,'Orders/'+orderno+'/data');
        get(reference).then((snapshot)=>{
            if(snapshot.exists()){
                setData(snapshot.val());
            }
            else{
                setEnter(false);
            }
        }).catch(err=>console.log(err))
        
    }
    const getStatus=()=>{
        const reference = ref(database,'Orders/'+orderno+'/status');
        get(reference).then((snapshot)=>{
            if(snapshot.exists()){
                setStatus(snapshot.val());
                if(snapshot.val()){
                    const refer = ref(database,'Orders/'+orderno+'/delivery');
                    get(refer).then((snapshot)=>{
                        setDeli(snapshot.val());
                    }).catch(err=>console.log(err))
                    const refer2 = ref(database,'Orders/'+orderno+'/tracking');
                    get(refer2).then((snapshot)=>{
                        setTrack(snapshot.val());
                    }).catch(err=>console.log(err))
                }
            }
            else{
                setEnter(false);
            }
        }).catch(err=>console.log(err))
        
    }
    useEffect(()=>{
       GetCart();
       getData();
       getStatus();
       // eslint-disable-next-line
    },[])
    useEffect(()=>{
        let ttmp=0;
       for (let i = 0; i < cart.length; i++) {
         ttmp+=cart[i].price*cart[i].quantity;
       }
       setTotal(ttmp);
       // eslint-disable-next-line
    },[cart])
    if(!enter){
        window.location.href='/';
    }

    function CancelOrder()
    {
        const reference = ref(database,'Orders/'+orderno);
        remove(reference).then(()=>{
            alert('Your Order is Canceled');
            window.location.href='/';
        }).catch(err=>console.log(err))
    }
  return (
    <div>
        <Container>
            <div style={{paddingTop:50,paddingBottom:50}}>
                <h5 style={{fontWeight:'bold'}}>Order Summary:</h5>
            </div>
            <table className='dispTableOrderShow'>
                <thead>
                    
                </thead>
                <tbody>
                    {cart.map((x,i)=>(
                        <tr key={i}>
                            <td><img src={x.url} alt="#" width={100}/></td>
                            <td><h5>{x.name} x {x.quantity}</h5></td>
                            <td><h5>Rs. {x.price*x.quantity}</h5></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div style={{textAlign:'right',paddingTop:50}}>
                <h5 className='textOrderShow'>Sub-Total: {total}</h5>
                <h5 className='textOrderShow'>Shipping: {delivery===1?'Not Calculated':delivery}</h5>
                <h5 style={{fontWeight:'bold'}}>Total: {delivery===1?total:parseInt(total)+parseInt(delivery)}</h5>
            </div>
            <div style={{border:'1px solid gray'}}></div>
            <div style={{display:'flex',paddingTop:50}}>
                <img src={Tick} alt='#' width={80}/>
                <div>
                    <h6>Order# {orderno}</h6>
                    <h3>Thank You {data.name}!</h3>
                </div>
            </div>
            <div style={{paddingTop:20}}></div>
            {!status?<button className='buttonConShop' onClick={CancelOrder}>Cancel Order</button>:<></>}

            <h5 className='textOrderShow' style={{paddingTop:20}}>{status?`Leopards Tracking# ${track}`:''}</h5>
            <div style={{paddingTop:50}}></div>
            <div className='boxOrderShow'>
                <h3 style={{fontWeight:600}}>Order Details</h3>
                <h5 style={{paddingTop:10}}>Contact Information</h5>
                <p>{data.email}</p>
                <h6>{data.phone}</h6>
                <h5 style={{paddingTop:10}}>Shipping Address</h5>
                <p>{data.address}</p>
                <h5 style={{paddingTop:10}}>Payment Method</h5>
                <p>Cash On Delivery (COD)</p>
                <h5 style={{paddingTop:10}}>Billing Address</h5>
                <p>{data.address}</p>
            </div>
            <div style={{paddingTop:50}}></div>
            <button className='buttonConShop' onClick={()=>{window.location.href='/'}}>Continue Shopping</button>
            <div style={{paddingTop:50}}></div>
        </Container>
      
    </div>
  )
}

export default Order;
