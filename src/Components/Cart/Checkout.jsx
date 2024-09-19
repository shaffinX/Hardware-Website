import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './checkout.css'
import MediaQuery from 'react-responsive';
import axios from 'axios';
import {get, ref,set} from 'firebase/database';
import {database} from '../../firebase';
import load from '../../Assets/loading.svg';
function Checkout({cartItems}) {
  const [loader,setLoader]=useState(false)
  const [total,setTotal]=useState(0);
  const [Fname,setFName]=useState('');
  const [Lname,setLName]=useState('');
  const [address,setAdd]=useState('');
  const [city,setCity]=useState('');
  const [state,setState]=useState('');
  const [zip,setZip]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
    useEffect(()=>{
      let ttmp=0;
      for (let i = 0; i < cartItems.length; i++) {
        ttmp+=cartItems[i].price*cartItems[i].quantity;
      }
      setTotal(ttmp);
    },[cartItems])
    if(cartItems.length===0){
      window.location.href='/Cart'
    }

  async function Mailer(data,orderno){
    const reference = ref(database,'admins/');
    let res=[]
    await get(reference).then((snapshot)=>{
      let temp = Object.values(snapshot.val())
      for (let i = 0; i < temp.length; i++) {
        res.push(temp[i].email);
      }
    })

    res = res.join(',');
   
    await axios.post('https://mail-server-eta.vercel.app/api/mailadmin',{data:data,cart:cartItems,orderno:orderno,email:res}).then(Response=>{
      console.log(Response.status);
    }).catch(err=>console.log(err))
    await axios.post('https://mail-server-eta.vercel.app/api/mail',{data:data,cart:cartItems,orderno:orderno}).then(Response=>{
      console.log(Response.status);
    }).catch(err=>console.log(err))

    return true;
  }
  const generateUniqueOrderNumber = async () => {
    let orderNumber;
    let reference,snapshot;
    while (true) {
      // Generate a candidate order number
      orderNumber = `ORD-${Date.now()}`;
      reference = ref(database, 'Orders/'+orderNumber);
      snapshot = await get(reference);
      if(!snapshot.exists()){
        break;
      }
    }
  
    return orderNumber;
  };
  
  function OrderMaker(orderno,data)
  {
    const reference = ref(database,'Orders/'+orderno)
    set(reference,{cart:cartItems,data:data,status:false}).catch(err=>console.log(err));
  }
  async function CompleteOrder()
  {
    if(Fname&&Lname&&address&&city&&state&&zip&&phone&&email)
    {
      let orderno = await generateUniqueOrderNumber();
       // eslint-disable-next-line
      let compAddress = address+', '+city+', '+state+', Pakistan'+', '+zip; 
      let name = Fname+' '+Lname;
      let data = {name:name,address:compAddress,total:total,email:email,phone:phone};
      setLoader(true);
      OrderMaker(orderno,data);
      
      await Mailer(data,orderno);
      window.location.href=`/Confirmation/${orderno}`;
    }
    else{
      alert('Please Enter all the Fields')
    }

  }
  return (
    <div>
      <MediaQuery minWidth={800}>
        <Container>
          <Row>
            <Col>
              <h2 className='checkoutHeader'>CHECKOUT</h2>
            </Col>
          </Row>
          <div className='lineCheckout'></div>
          <Row>
            <div style={{width:'100%',display:'flex',gap:50}}> 
              <div className='CheckoutLeftPanel'>
                <Row>
                  <Col style={{paddingTop:50,paddingBottom:10}}>
                    <h5 className='checkoutBillText'>Billing Details</h5>
                  </Col>
                </Row>
                <div className="checkoutLineSmal"></div>
                <div style={{paddingTop:50,paddingBottom:50}}>
                  <div style={{display:'flex',gap:10,width:'100%'}}>
                    <div class="mb-3" style={{width:'100%'}}>
                      <label className='labelCheckout'>First Name</label>
                      <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setFName(e.target.value)}} value={Fname}/>
                    </div>
                    <div class="mb-3" style={{width:'100%'}}>
                      <label className='labelCheckout'>Last Name</label>
                      <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setLName(e.target.value)}} value={Lname}/>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label className='labelCheckout'>Country / Region</label>
                    <input type="text" id="disabledTextInput" class="form-control" disabled placeholder="Pakistan"/>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>Street Address</label>
                    <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setAdd(e.target.value)}} value={address}/>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>City</label>
                    <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>State / Province</label>
                    <select class="form-select borderInpCheckout" aria-label="Default select example" value={state} onChange={(e)=>{setState(e.target.value)}}>
                      <option selected>Select an Option</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                      <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                      <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                      <option value="FATA">FATA</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                    </select>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>Postcode / ZIP</label>
                    <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setZip(e.target.value)}} value={zip}/>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>Phone</label>
                    <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                  </div>
                  <div class="mb-3" style={{width:'100%'}}>
                    <label className='labelCheckout'>Email</label>
                    <input type="email" class="form-control borderInpCheckout" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                  </div>
                </div>
              </div>
              <div className='CheckoutRightPanel'>
                <div style={{paddingTop:50}}></div>
                <div className='boxCheckoutRight'>
                  <h5 className='checkoutOrderHead'>Your Order</h5>
                  <div style={{paddingTop:25}}></div>
                  <div className='table-container-Checkout'>
                    <table className='head-table-Checkout'>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((x,i)=>(
                          <tr>
                            <td>{x.name} x {x.quantity}</td>
                            <td>{x.price*x.quantity}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>Total</td>
                          <td>{total}</td>
                        </tr>
                        <tr>
                          <td>Delivery</td>
                          <td>After dispatch</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{paddingTop:20}}></div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                    <label class="form-check-label labelCheckout-2" for="flexRadioDefault1">Cash On Delivery</label>
                  </div>
                  <div style={{paddingTop:20}}></div>
                  <button className='buttonCheckout' onClick={CompleteOrder}>Place Order</button>
                  {loader?<div style={{justifyContent:'center',display:'flex',paddingTop:5}}><img width={50} src={load} alt={load}/></div>:<></>}
                </div>
              </div>
            </div>
            
          </Row>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <Container>
          <Row>
            <Col>
              <h3 className='checkoutHeader'>CHECKOUT</h3>
            </Col>
          </Row>
          <div className='lineCheckout'></div>
          <Row>
            <Col style={{paddingTop:20,paddingBottom:10}}>
              <h6 className='checkoutBillText'>Billing Details</h6>
            </Col>
          </Row>
          <div style={{paddingTop:20,paddingBottom:50}}>
            <div style={{display:'flex',gap:10,width:'100%'}}>
              <div class="mb-3" style={{width:'100%'}}>
                <label className='labelCheckout'>First Name</label>
                <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setFName(e.target.value)}} value={Fname}/>
              </div>
              <div class="mb-3" style={{width:'100%'}}>
                <label className='labelCheckout'>Last Name</label>
                <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setLName(e.target.value)}} value={Lname}/>
              </div>
            </div>
            <div class="mb-3">
              <label className='labelCheckout'>Country / Region</label>
              <input type="text" id="disabledTextInput" class="form-control" disabled placeholder="Pakistan"/>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>Street Address</label>
              <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setAdd(e.target.value)}} value={address}/>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>City</label>
              <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>State / Province</label>
              <select class="form-select borderInpCheckout" aria-label="Default select example" value={state} onChange={(e)=>{setState(e.target.value)}}>
                <option selected>Select an Option</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                <option value="FATA">FATA</option>
                <option value="Azad Kashmir">Azad Kashmir</option>
              </select>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>Postcode / ZIP</label>
              <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setZip(e.target.value)}} value={zip}/>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>Phone</label>
              <input type="text" class="form-control borderInpCheckout" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
            </div>
            <div class="mb-3" style={{width:'100%'}}>
              <label className='labelCheckout'>Email</label>
              <input type="email" class="form-control borderInpCheckout"  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
            </div>
          </div>

          <div className='boxCheckoutRight'>
            <h5 className='checkoutOrderHead'>Your Order</h5>
            <div style={{paddingTop:25}}></div>
            <div className='table-container-Checkout'>
              <table className='head-table-Checkout'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((x,i)=>(
                    <tr>
                      <td>{x.name} x {x.quantity}</td>
                      <td>{x.price*x.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td>{total}</td>
                  </tr>
                  <tr>
                    <td>Delivery</td>
                    <td>After dispatch</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{paddingTop:20}}></div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
              <label class="form-check-label labelCheckout-2" for="flexRadioDefault1">Cash On Delivery</label>
            </div>
            <div style={{paddingTop:20}}></div>
            <button className='buttonCheckout' onClick={CompleteOrder}>Place Order</button>
            {loader?<div style={{justifyContent:'center',display:'flex',paddingTop:5}}><img width={50} src={load} alt={load}/></div>:<></>}
          </div>
          <div style={{paddingTop:50}}></div>

        </Container>
      </MediaQuery>

      
    </div>
  )
}

export default Checkout
