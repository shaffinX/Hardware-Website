import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {get,ref,set,remove} from 'firebase/database';
import {database} from '../../../firebase';
import downloadpdf from './downloadpdf';
import { FaDownload } from "react-icons/fa6";
import axios from 'axios';
import load from '../../../Assets/loading.svg';
function OrderOpenPanel({orderno}) {
    const [cart,setCart]=useState([{}]);
    const [data,setData]=useState({});
    const [status,setStatus] = useState(true);
    const [delivery,setDeli] = useState(1);
    const [track,setTrack] = useState('');
    const [loader,setLoader]=useState(false)
    async function Mailer(){
   
        await axios.post('https://mail-server-eta.vercel.app/api/trackorder',{email:data.email,track:track,total:data.total,delivery:delivery,orderno:orderno}).then(Response=>{
          console.log(Response.status);
        }).catch(err=>console.log(err))
        return true;
    }
    useEffect(()=>{
        const reference1 = ref(database,'Orders/'+orderno+'/cart')
        get(reference1).then((snapshot)=>{
            setCart(snapshot.val());
            const reference2 = ref(database,'Orders/'+orderno+'/data');
            get(reference2).then((snapshot)=>{
                setData(snapshot.val());
                const reference3 = ref(database,'Orders/'+orderno+'/status');
                get(reference3).then((snapshot)=>{
                    setStatus(snapshot.val());
                })
                const reference4 = ref(database,'Orders/'+orderno+'/delivery');
                get(reference4).then((snapshot)=>{
                    if(snapshot.exists()){
                        setDeli(snapshot.val());
                    }
                })
                const reference5 = ref(database,'Orders/'+orderno+'/tracking');
                get(reference5).then((snapshot)=>{
                    if(snapshot.exists()){
                        setTrack(snapshot.val());
                    }
                })
            })
        })
    },[orderno])
    async function Submit()
    {
       if(delivery!==1&&track)
       {
        setLoader(true);
        const reference = ref(database,'Orders/'+orderno);
        set(reference,{
            cart:cart,
            data:data,
            status:true,
            delivery:delivery,
            tracking:track
        }).then(()=>{
            
        }).catch(err=>console.log(err))

        let Bill = [];
        const refer = ref(database,'Bill/');
        get(refer).then((snapshot)=>{
           if(snapshot.exists()){
            Bill = snapshot.val();
            for(let i=0;i<cart.length;i++){
                Bill.push(cart[i]);
            }
            set(refer,Bill).catch(err=>console.log(err))
           }
           else{
            for(let i=0;i<cart.length;i++){
                Bill.push(cart[i]);
            }
            set(refer,Bill).catch(err=>console.log(err))
           }
        }).catch(err=>console.log(err))

        await Mailer();

        window.location.reload();
       }
       else{
        alert('Fill both fields!')
       }
    }

    function Delete()
    {
        const reference = ref(database,'Orders/'+orderno);
        remove(reference).then(()=>{
            window.location.reload();
        }).catch(err=>console.log(err))
    }

  return (
    <div>
      <Container>
        {loader?<div style={{justifyContent:'center',display:'flex',paddingTop:5}}><img width={50} src={load} alt={load}/></div>:<></>}
        {!status?
            <div>
                <div  style={{display:'flex',gap:20}}>
                    <div class="mb-3" style={{width:'100%'}}>
                        <label for="exampleInputEmail1" class="labelOrderAdmin">Delivery Charges</label>
                        <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setDeli(e.target.value)}}/>
                    </div>
                    <div class="mb-3" style={{width:'100%'}}>
                        <label for="exampleInputEmail1" class="labelOrderAdmin">Tracking#</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setTrack(e.target.value)}}/>
                    </div>
                </div>
                <button className='buttonConShop' onClick={Submit}>Submit</button>
            </div>:
            <div>
                <button className='buttonConShop' onClick={Delete}>Delete</button>
                <div style={{paddingTop:20}}></div>
                <div style={{display:'flex',justifyContent:'right'}}>
                    <div style={{width:'40%'}}><button className='buttonConShop' onClick={()=>{downloadpdf(cart,data,delivery)}}>Download Bill <FaDownload/></button></div>
                </div>
            </div>
        }
        <div style={{paddingTop:50}}></div>
        <div className="table-container">
            <table className='head-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Partno</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((x,i)=>(
                        <tr key={i}>
                            <td><img src={x.url} alt='#' width={100}/></td>
                            <td>{x.partno}</td>
                            <td>{x.name} x {x.quantity}</td>
                            <td>{x.size}</td>
                            <td>{x.price*x.quantity}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            
        </div>
        <div style={{textAlign:'right',paddingTop:50}}>
            <h5 className='textOrderShow'>Sub-Total: {data.total}</h5>
            <h5 className='textOrderShow'>Shipping: {delivery===1?'Not Calculated':delivery}</h5>
            <h5 style={{fontWeight:'bold'}}>Total: {delivery===1?data.total:parseInt(data.total)+parseInt(delivery)}</h5>
        </div>
        <div style={{paddingTop:50}}></div>
        <div className='boxOrderShow'>
            <h3 style={{fontWeight:600}}>Order Details</h3>
            <h5 style={{paddingTop:10}}>Contact Information</h5>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <h6>{data.phone}</h6>
            <h5 style={{paddingTop:10}}>Shipping Address</h5>
            <p>{data.address}</p>
            <h5 style={{paddingTop:10}}>Payment Method</h5>
            <p>Cash On Delivery (COD)</p>
            <h5 style={{paddingTop:10}}>Billing Address</h5>
            <p>{data.address}</p>
            {track?<div>
                <h5>Tracking#</h5>
                <p>{track}</p>
            </div>:<></>}
        </div>
        {!status?<div style={{justifyContent:'center',display:'flex',paddingTop:50}}><button style={{width:'50%'}} onClick={Delete} className='buttonConShop'>Delete</button></div>:<></>}
      </Container>
    </div>
  )
}

export default OrderOpenPanel
