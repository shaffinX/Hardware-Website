import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./nav.css";
import logo from "../../Assets/logoS.svg";
import MediaQuery from "react-responsive";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Navigator from "./Navigator";
import NavigatorM from "./NavigatorM";
export default function Navigation() {
  const [navCl,setNavcl] = useState(false);
  const [admin,setAdmin] = useState(false);
  const handleClose=()=>{
    setNavcl(!navCl);
  }
  useEffect(()=>{
    let tokken = Cookies.get('tokkenSign');
    if(tokken === 'f5Z89Y7P3zfYdfKiZw8tctWarCsYCtDjLbCItSwt1FBZLqhMJH2UG2gxR7iWbd7Z' || tokken==='kW9BSmL7YZxyOw70h2MaPEdfFvQ52bSC68dwXT8p7OrQBPJXCF8RGq2hMgtsBuzG'){
      setAdmin(true);
    }
  },[])
  return (
    <div style={{backgroundColor:'#fff'}}>
      <MediaQuery minWidth={1280} >
        <Container className="navi">
          <img src={logo} alt={logo} width={200} />
          <div className="navitm">
            <Link to='/' style={{textDecoration:'none'}}><h5>HOME</h5></Link>
            <div style={{ paddingLeft: "5%" }}></div>
            <h5>ABOUT</h5>
            <div style={{ paddingLeft: "5%" }}></div>
            <Navigator layout={'CURTAIN HARDWARE'}/>
            <div style={{ paddingLeft: "5%" }}></div>
            <Navigator layout={'FURNITURE HARDWARE'}/>
            <div style={{ paddingLeft: "5%" }}></div>
            <a style={{textDecoration:'none'}} href='/Product-Category/DHardW'><h5>DOOR HARDWARE</h5></a>
            <div style={{ paddingLeft: "5%" }}></div>
            <Navigator layout={'CUSTOMIZE HANDLES'}/>
            <div style={{ paddingLeft: "3%" }}></div>
            {admin?<Link to='/Settings' style={{textDecoration:'none'}}><h5>SETTINGS</h5></Link>:<></>}
            <div style={{ paddingLeft: "3%" }}></div>
            <h5 onClick={()=>{window.location.href='/Cart'}}><HiShoppingCart fontSize={40}/></h5>
          </div>
        </Container>
      </MediaQuery>

      <MediaQuery maxWidth={1279} >
        <Container className="navi">
          {navCl?<IoClose fontSize={40} onClick={handleClose} style={{cursor:'pointer'}}/>:<HiMenuAlt2 fontSize={40} onClick={handleClose}  style={{cursor:'pointer'}}/>}
          <div style={{textAlign:'center',width:'100%'}}><img src={logo} alt={logo} width={150} /></div>
          <HiShoppingCart fontSize={40} className="cartHoversm" onClick={()=>{window.location.href='/Cart'}}/>
        </Container>
        {navCl?
          <div style={{padding:5,position:'fixed',width:'100%'}}>
            <div className="navMenu">
              <div className="navMenright">
                <Link to='/' onClick={()=>{setTimeout(()=>{handleClose()},300)}} style={{textDecoration:'none'}}><h6>HOME</h6></Link>
                <h6> ABOUT</h6>
                <NavigatorM layout={'CURTAIN HARDWARE'}/>
                <NavigatorM layout={'FURNITURE HARDWARE'}/>
                <a style={{textDecoration:'none'}} href='/Product-Category/DHardW'><h6>DOOR HARDWARE</h6></a>
                <NavigatorM layout={'CUSTOMIZE HANDLES'}/>
                {admin?<Link onClick={()=>{setTimeout(()=>{handleClose()},300)}} to='/Settings' style={{textDecoration:'none'}}><h6> SETTINGS</h6></Link>:<div></div>}
                <div style={{paddingTop:250}}></div>
              </div>

            </div>

          </div>:
          <div></div>

        }

      </MediaQuery>
    </div>
  );
}
