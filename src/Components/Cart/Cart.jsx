import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './cart.css';
import MediaQuery from 'react-responsive';
import { HiShoppingCart } from "react-icons/hi";

function Cart({cartItems,removeFromCart}) {
    const [total,setTotal]=useState(0);
    useEffect(()=>{
      let ttmp=0;
      for (let i = 0; i < cartItems.length; i++) {
        ttmp+=cartItems[i].price*cartItems[i].quantity;
      }
      setTotal(ttmp);
    },[cartItems])

    function GotoCheck()
    {
      window.location.href =  `/Checkout`;
    }
  return (
    <div>
      <MediaQuery minWidth={481}>
        <Container>
          <Row>
            <Col>
              <h1 className='CartHead'>CART</h1>
              <div style={{display:'flex',justifyContent:'center'}}><div className='CartHeadUnderLine'></div></div>
            </Col>
          </Row>
          <div style={{paddingTop:100}}></div>
          <Row>
            <Col>
              <a href='/' style={{textDecoration:'none', color:'#FA8241'}}><h5 className='CTSText'>{'CONTINUE SHOPPING >'}</h5></a>
            </Col>
          </Row>
          {total?
            <div>
              <div className='table-container-Cart'>
                  <table className='head-table-Cart'>
                    <thead>
                        <tr>
                          <th>Remove</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>price</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((x,i)=>(
                        <tr key={i}>
                          <td><button onClick={()=>removeFromCart(x)}>Remove</button></td>
                          <td><img src={x.url} alt='#' width={150}/></td>
                          <td>{x.name}</td>
                          <td>{x.price}</td>
                          <td>{x.size}</td>
                          <td>{x.quantity}</td>
                          <td>{x.price*x.quantity}</td>                  
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Row>
                  <Col style={{textAlign:'right',paddingTop:50}}>
                    <h4 style={{fontWeight:'bold'}}> Total Amount: {total}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign:'right',paddingTop:20}}>
                    <button onClick={GotoCheck} className='PCOButton'>PROCEED TO CHECKOUT</button>
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign:'center',paddingTop:50}}>
                    <h6 style={{fontWeight:'bold'}}> The Delivery charge will be given after the order is dispached.</h6>
                    <h6  style={{fontWeight:'bold'}}>For more information see our delivery charge policy</h6>
                  </Col>
                </Row>
            </div>
            :
            <div>
              <h1 style={{textAlign:'center',fontWeight:'bold',paddingTop:100}}><HiShoppingCart/> Cart is empty</h1>
            </div>
          }

          <div style={{paddingTop:100}}></div>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={480}>
        <Container>
          <Row>
            <Col>
              <h1 className='CartHead'>CART</h1>
              <div style={{display:'flex',justifyContent:'center'}}><div className='CartHeadUnderLine'></div></div>
            </Col>
          </Row>
          <div style={{paddingTop:50}}></div>
          <Row>
            <Col>
              <a href='/' style={{textDecoration:'none', color:'#FA8241'}}><h6 className='CTSText'>{'CONTINUE SHOPPING >'}</h6></a>
            </Col>
          </Row>
          {total?
            <div>
              <div className='table-container-Cart'>
                <table className='head-table-Cart'>
                  <thead>
                      <tr>
                        <th>Products</th>
                        <th>details</th>
                      </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((x,i)=>(
                      <tr key={i}>
                        <td style={{display:'flex',width:'100%',gap:30}}>
                          <button onClick={()=>removeFromCart(x)}>X</button>
                          <img src={x.url} alt='#' width={50}/>       
                        </td>
                        <td>
                          <div className='detailCartsss'>
                            <p>{x.name}</p>
                            <p>Size: {x.size} Quantity: {x.quantity}</p>
                          </div>
                        </td>
                                          
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Row>
                <Col style={{textAlign:'center',paddingTop:50}}>
                  <h4 style={{fontWeight:'bold'}}> Total Amount: {total}</h4>
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:'center',paddingTop:10}}>
                  <button className='PCOButton' onClick={GotoCheck}>PROCEED TO CHECKOUT</button>
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:'center',paddingTop:50,fontSize:'small'}}>
                  <p>The Delivery charge will be given after the order is dispached. For more information see our delivery charge policy</p>
                </Col>
              </Row>
            </div>:
            <div>
              <h3 style={{textAlign:'center',fontWeight:'bold',paddingTop:100}}><HiShoppingCart/> Cart is empty</h3>
            </div>
          }

          <div style={{paddingTop:100}}></div>
        </Container>
      </MediaQuery>

      
    </div>
  )
}

export default Cart
