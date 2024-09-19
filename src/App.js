import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Login from './Components/Login/Login';
import Navigation from "./Components/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import CreateAdmin from "./Components/Login/CreateAdmin";
import ProtectedRoutes from './ProtectedRoutes';
import Admin from "./Components/Admin";
import Settings from "./Components/Settings";
import Home from "./Components/Home/Home";
import Listing from "./Components/Listing/Listing";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import ListingT from "./Components/Listing/ListingT";
import ProductDisplayT from "./Components/ProductDisplay/ProductDisplayT";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmed from "./Components/Cart/OrderConfirmed";
import Order from "./Components/OrderShow/Order";
import OrdersAdmin from "./Components/Settings/OrdersAdmin/OrdersAdmin";
import ProtectedRoutesS from "./ProtectedRoutesS";
import DeleteAdmin from "./Components/Login/DeleteAdmin";
import Month from './Month';
import Footer from "./Components/Footer/Footer";
function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('CART');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(()=>{
    Month();
    const intervalId = setInterval(() => {
      Month();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  },[])

  //----------------------
  useEffect(() => {
    localStorage.setItem('CART', JSON.stringify(cartItems));
  }, [cartItems]);

  function AddToCart(product){
    const existingItem = cartItems.find(
      item => item.partno === product.partno && item.size === product.size
    );

    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.partno === product.partno && item.size === product.size 
          ? { ...item, quantity: (parseInt(item.quantity) + parseInt(product.quantity)) }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };

  function removeFromCart(product) {
    setCartItems(cartItems.filter(item => 
      !(item.partno === product.partno && item.size === product.size)
    ));
  }

  //localStorage.removeItem('CART')

  return (
    <div>
      
      <div className="app-container">
        <Router>
          <div style={{position:'sticky',top:0,zIndex:1000}}><Navigation/></div>
          <Routes>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/Orders/:orderno" element={<Order/>}/>
            <Route path="/Cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart}/>}/>
            <Route path="/Checkout" element={<Checkout cartItems={cartItems}/>}/>
            <Route path="/Confirmation/:orderno" element={<OrderConfirmed  cartItems={cartItems}/>}/>
            <Route path="/Product-Category/:category" element={<Listing/>}/>
            <Route path="/Product-Category-t/:category" element={<ListingT/>}/>
            <Route path="/Product-Category/:category/:partno" element={<ProductDisplay AddToCart={AddToCart}/>}/>
            <Route path="/Product-Category-t/:category/:partno" element={<ProductDisplayT AddToCart={AddToCart}/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/Settings" element={<Settings/>}/>
              <Route path="/Settings/Admin" element={<Admin/>}/>
              <Route path="/Settings/Orders" element={<OrdersAdmin/>}/>
            </Route>
            <Route element={<ProtectedRoutesS/>}>
              <Route path="/Settings" element={<Settings/>}/>
              <Route path="/Settings/Admin" element={<Admin/>}/>
              <Route path="/Settings/CreateAdmin" element={<CreateAdmin/>}/>
              <Route path="/Settings/DeleteAdmin" element={<DeleteAdmin/>}/>
              <Route path="/Settings/Orders" element={<OrdersAdmin/>}/>
            </Route>
          </Routes>
        </Router>

      </div>
      <div style={{paddingTop:100}}></div>
      <Footer/>
    </div>
  );
}

export default App;
