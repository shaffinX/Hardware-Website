import React, { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Tick from '../../Assets/tick.gif';
function OrderConfirmed({ cartItems }) {
  const { orderno } = useParams();
  const [cart, setCart] = useState([]);
  const [total,setTotal] = useState(0);
  useEffect(() => {
    setCart(cartItems);
    let ttmp=0;
    for (let i = 0; i < cartItems.length; i++) {
      ttmp+=cartItems[i].price*cartItems[i].quantity;
    }
    setTotal(ttmp);
    // eslint-disable-next-line
  }, []);
  localStorage.removeItem("CART");
  return (
    <div>
      <div style={{ backgroundColor: "#FA8241", color: "white" }}>
        <div style={{display:'flex',justifyContent:'center', paddingTop: 50 }}><img src={Tick} alt="#" width={100}/></div>
        <h2
          style={{ fontWeight: "bold", textAlign: "center", paddingTop: 10 }}
        >
          YOUR ORDER IS CONFIRMED 
        </h2>
        <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
          Order# {orderno}
        </h3>
        <div style={{ paddingTop: 50 }}></div>
      </div>
      <Container>
        <div>
          <h3 style={{ paddingTop: 20, fontWeight: "bold" }}>Order Summary:</h3>
        </div>
        <div className="table-container-Cart">
          <table className="head-table-Cart">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>price</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((x, i) => (
                <tr key={i}>
                  <td>
                    <img src={x.url} alt="#" width={150} />
                  </td>
                  <td>{x.name}</td>
                  <td>{x.price}</td>
                  <td>{x.size}</td>
                  <td>{x.quantity}</td>
                  <td>{x.price * x.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{textAlign:'right',paddingTop:50}}>
          <h4 style={{fontWeight:'bold'}}> Total Amount: {total}</h4>
        </div>
        <Row>
          <Col style={{textAlign:'center',paddingTop:50}}>
            <h6 style={{fontWeight:'bold'}}> The Delivery charge will be given after the order is dispached.</h6>
            <h6  style={{fontWeight:'bold'}}>For more information see our delivery charge policy</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirmed;
