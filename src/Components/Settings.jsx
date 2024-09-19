import React, { useEffect, useState } from 'react';
import './admin.css';
import { Col, Container, Row } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Bill from './Settings/Bill/Bill';
import Cookies from 'js-cookie';
function Settings() {
    const [superAd,setSuperAd]=useState(false);
    useEffect(()=>{
        if(Cookies.get('tokkenSign')==='kW9BSmL7YZxyOw70h2MaPEdfFvQ52bSC68dwXT8p7OrQBPJXCF8RGq2hMgtsBuzG'){
            setSuperAd(true);
        }
    },[])
    const LogOut=()=>{
        Cookies.remove('name');
        Cookies.remove('tokkenSign');
        window.location.href = '/';
    }
  return (
    <div>
        <MediaQuery minWidth={1024}>
            <Container>
                <Row>
                    <Col style={{textAlign:'center',paddingTop:50}}>
                        <h1 style={{fontWeight:'bolder'}}>{superAd?'SUPER ADMIN SETTINGS':'SETTINGS'}</h1>
                        <div style={{paddingTop:50}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <Link to='/Settings/Admin' style={{textDecoration:'none'}}>
                            <div className='TileRec'>
                                <h1>Admin Panel</h1>
                            </div>
                        </Link>
                        
                    </Col>
                    <Col style={{textAlign:'center'}}>
                        <Link to='/Settings/Orders' style={{textDecoration:'none'}}> 
                            <div className='TileRec'>
                                <h1>Orders</h1>
                            </div>
                        </Link>
                    </Col>
                    {superAd?<Col style={{textAlign:'center'}}>
                        <div className='TileRec' onClick={Bill}>
                            <h1>Bills</h1>
                        </div>
                    </Col>:<Col></Col>}

                </Row>
                <div style={{paddingTop:20}}></div>
                {superAd?<Row>
                    <Col style={{textAlign:'center'}}>
                        <Link to='/Settings/CreateAdmin' style={{textDecoration:'none'}}>
                            <div className='TileRec'>
                                <h1>Create Admin</h1>
                            </div>
                        </Link>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                        <Link to='/Settings/DeleteAdmin' style={{textDecoration:'none'}}>
                            <div className='TileRec'>
                                <h1>Delete Admin</h1>
                            </div>
                        </Link>
                    </Col>
                    <Col></Col>
                </Row>:<></>}
                <Row>
                    <Col style={{textAlign:'center',paddingTop:50}}>
                        <button onClick={LogOut} className='buttonLogout'>Logout</button>
                    </Col>
                </Row>
            </Container>
        </MediaQuery>
        <MediaQuery maxWidth={1023}>
            <Container>
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <h1>{superAd?'SUPER ADMIN SETTINGS':'SETTINGS'}</h1>
                        <div style={{paddingTop:50}}></div>
                    </Col>
                </Row>
                <Row>
                    <Link to="/Settings/Admin"  style={{textDecoration:'none'}}>
                        <Col style={{display:'flex',justifyContent:'center'}}>
                            <div className='TileRec'>
                                <h1>Admin Panel</h1>
                            </div>
                        </Col>
                    </Link>
                    
                </Row>
                <div style={{paddingTop:50}}></div>
                <Row>
                    <Link to='/Settings/Orders'  style={{textDecoration:'none'}}>
                        <Col style={{display:'flex',justifyContent:'center'}}>
                            <div className='TileRec'>
                                <h1>Orders</h1>
                            </div>
                        </Col>
                    </Link>
                    
                </Row>
                <div style={{paddingTop:50}}></div>
                <Row>
                    {superAd?<Col style={{textAlign:'center'}}>
                        <div className='TileRec' onClick={Bill}>
                            <h1>Bills</h1>
                        </div>
                    </Col>:<></>}
                </Row>
                <Row>
                    <Col style={{textAlign:'center',paddingTop:50}}>
                        <button onClick={LogOut} className='buttonLogout'>Logout</button>
                    </Col>
                </Row>
            </Container>
        </MediaQuery>
        
        
    </div>
  )
}

export default Settings
