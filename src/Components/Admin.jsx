import React, { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FiPlusCircle } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import './admin.css';
import Create from './Settings/Non Type/Create';
import Update from './Settings/Non Type/Update';
import Delete from './Settings/Non Type/Delete';
import CreateType from './Settings/Types/CreateType';
import UpdateType from './Settings/Types/UpdateType';
import MediaQuery from 'react-responsive';
import { IoIosArrowUp } from "react-icons/io";
// import Cookies from 'js-cookie';
function Admin() {
  const [stateRender,setRender]=useState('create finial');
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const topScroll = useRef(null);

  const handletopScroll = () => {
    if (topScroll.current) {
      topScroll.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function Render(){
    if(stateRender==='create finial'){
      return<Create name='Finial' store='Finials'/>
    }
    if(stateRender==='update finial'){
      return <Update name='Finial' store='Finials'/>
    }
    if(stateRender==='delete finial'){
      return<Delete name='Finial' store='Finials'/>
    }
    if(stateRender==='create bracket'){
      return<Create name='Bracket' store='Brackets'/>
    }
    if(stateRender==='update bracket'){
      return<Update name='Bracket' store='Brackets'/>
    }
    if(stateRender==='delete bracket'){
      return<Delete name='Bracket' store='Brackets'/>
    }
    if(stateRender==='create tiehooks'){
      return<Create name='Tie Hook' store='TieHooks'/>
    }
    if(stateRender==='update tiehooks'){
      return<Update name='Tie Hook' store='TieHooks'/>
    }
    if(stateRender==='delete tiehooks'){
      return<Delete name='Tie Hook' store='TieHooks'/>
    }
    if(stateRender==='create rods'){
      return<Create name='Rod' store='Rods'/>
    }
    if(stateRender==='update rods'){
      return<Update name='Rod' store='Rods'/>
    }
    if(stateRender==='delete rods'){
      return<Delete name='Rod' store='Rods'/>
    }
    if(stateRender==='create handles'){
      return<CreateType name='Handle' store='Handles' typeS={{a:'cabinet',b:'drawer'}} typeName={{a:'Cabinet Handles',b:'Drawer Handles'}}/>
    }
    if(stateRender==='update handles'){
      return<UpdateType name='Handle' store='Handles' typeS={{a:'cabinet',b:'drawer'}} typeName={{a:'Cabinet Handles',b:'Drawer Handles'}}/>
    }
    if(stateRender==='delete handles'){
      return<Delete name='Handle' store='Handles'/>
    }
    if(stateRender==='create sliders'){
      return<Create name='Drawer Slider' store='Sliders'/>
    }
    if(stateRender==='update sliders'){
      return<Update name='Drawer Slider' store='Sliders'/>
    }
    if(stateRender==='delete sliders'){
      return<Delete name='Drawer Slider' store='Sliders'/>
    }
    if(stateRender==='create hinges'){
      return<Create name='Hinge' store='Hinges'/>
    }
    if(stateRender==='update hinges'){
      return<Update name='Hinge' store='Hinges'/>
    }
    if(stateRender==='delete hinges'){
      return<Delete name='Hinge' store='Hinges'/>
    }
    if(stateRender==='create dlocks'){
      return<Create name='Drawer Lock' store='DLocks'/>
    }
    if(stateRender==='update dlocks'){
      return<Update name='Drawer Lock' store='DLocks'/>
    }
    if(stateRender==='delete dlocks'){
      return<Delete name='Drawer Lock' store='DLocks'/>
    }
    if(stateRender==='create slegs'){
      return<Create name='Sofa Leg' store='SLegs'/>
    }
    if(stateRender==='update slegs'){
      return<Update name='Sofa Leg' store='SLegs'/>
    }
    if(stateRender==='delete slegs'){
      return<Delete name='Sofa Leg' store='SLegs'/>
    }
    if(stateRender==='create dhardw'){
      return<Create name='Door Hardware' store='DHardW'/>
    }
    if(stateRender==='update dhardw'){
      return<Update name='Door Hardware' store='DHardW'/>
    }
    if(stateRender==='delete dhardw'){
      return<Delete name='Door Hardware' store='DHardW'/>
    }
    if(stateRender==='create chand'){
      return<CreateType name='Customize Handle' store='CHandles' typeS={{a:'main gate',b:'main door'}} typeName={{a:'Main Gate',b:'Main Door'}}/>
    }
    if(stateRender==='update chand'){
      return<UpdateType name='Customize Handle' store='CHandles' typeS={{a:'main gate',b:'main door'}} typeName={{a:'Main Gate',b:'Main Door'}}/>
    }
    if(stateRender==='delete chand'){
      return<Delete name='Customize Handle' store='CHandles'/>
    }
  }

  function Component(name,type){
    return(
      <div className="cover-2">
        <div className={`hovv ${stateRender===`create ${type}`?'active':''}`} onClick={()=>{setRender(`create ${type}`)}}>
          <FiPlusCircle fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Create a {name}</h6>
        </div>
        <div className={`hovv ${stateRender===`update ${type}`?'active':''}`} onClick={()=>{setRender(`update ${type}`)}}>
          <LuPencil fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Update a {name}</h6>
        </div>
        <div className={`hovv ${stateRender===`delete ${type}`?'active':''}`} onClick={()=>{setRender(`delete ${type}`)}}>
          <MdDelete fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Delete a {name}</h6>
        </div>
      </div>
    )
  }
  function Component2(name,type){
    return(
      <div style={{paddingTop: 20, width: '100%'}}>
        <div className={`hovv-m ${stateRender===`create ${type}`?'active':''}`} onClick={()=>{setRender(`create ${type}`);handleScroll();}}>
          <FiPlusCircle fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Create a {name}</h6>
        </div>
        <div className={`hovv-m ${stateRender===`update ${type}`?'active':''}`} onClick={()=>{setRender(`update ${type}`);handleScroll();}}>
          <LuPencil fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Update a {name}</h6>
        </div>
        <div className={`hovv-m ${stateRender===`delete ${type}`?'active':''}`} onClick={()=>{setRender(`delete ${type}`);handleScroll();}}>
          <MdDelete fontSize={22}/>
          <div style={{paddingLeft:10}}></div>
          <h6>Delete a {name}</h6>
        </div>
      </div>
    )
  }
  return (
    <div>
      <MediaQuery minWidth={1024}>
        <div style={{display:'flex'}}>
          <div className="panel-left">
            <div className="panel-left-sec">
              <Row>
                <Col style={{textAlign:'center',paddingTop:30,paddingBottom:30}}>
                  <h1 style={{fontWeight:'bolder'}}>Settings</h1>
                </Col>
              </Row>
              <div className="line"></div>
              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Finials</h3>
              </div>
              {Component('Finial','finial')}
              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Brackets</h3>
              </div>
              {Component('Bracket','bracket')}
              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Tie Hooks</h3>
              </div>
              {Component('Tie Hook','tiehooks')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Rods</h3>
              </div>
              {Component('Rod','rods')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Handles</h3>
              </div>
              {Component('Handle','handles')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Drawer Sliders</h3>
              </div>
              {Component('Drawer Slider','sliders')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Hinges</h3>
              </div>
              {Component('Hinge','hinges')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Drawer Locks</h3>
              </div>
              {Component('Drawer Lock','dlocks')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Sofa Legs</h3>
              </div>
              {Component('Sofa Leg','slegs')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Door Hardware</h3>
              </div>
              {Component('Door Hardware','dhardw')}

              <div className='cover'>
                <h3 style={{color:'#202020',fontWeight:'bold'}}>Customize Handles</h3>
              </div>
              {Component('Customize Handle','chand')}

              <div style={{paddingTop:500}}></div>
            </div>

          </div>


          <div className="panel-right">
            {Render()}
          </div>
        </div>

      </MediaQuery>

      <MediaQuery maxWidth={1023}>
        <div ref={topScroll}></div>
        <div className='panel-one'>
          <Container>
            <Row>
              <Col style={{textAlign:'center',paddingTop:30,paddingBottom:30}}>
                <h1 style={{fontWeight:'bolder'}}>Settings</h1>
              </Col>
            </Row>
            <div className="line"></div>
            <h3 className='head-M'>Finials</h3>
            {Component2('Finial','finial')}
            <h3 className='head-M'>Brackets</h3>
            {Component2('Bracket','bracket')}
            <h3 className='head-M'>Tie Hooks</h3>
            {Component2('Tie Hook','tiehooks')}
            <h3 className='head-M'>Rods</h3>
            {Component2('Rod','rods')}
            <h3 className='head-M'>Handles</h3>
            {Component2('Handle','handles')}
            <h3 className='head-M'>Drawer Sliders</h3>
            {Component2('Drawer Slider','sliders')}
            <h3 className='head-M'>Hinges</h3>
            {Component2('Hinge','hinges')}
            <h3 className='head-M'>Drawer Locks</h3>
            {Component2('Drawer Lock','dlocks')}
            <h3 className='head-M'>Sofa Legs</h3>
            {Component2('Sofa Leg','slegs')}
            <h3 className='head-M'>Door Hardware</h3>
            {Component2('Door Hardware','dhardw')}
            <h3 className='head-M'>Customize Handles</h3>
            {Component2('Customize Handle','chand')}

          </Container>
          <div style={{paddingTop:50}}></div>
          

        </div>
        <div style={{paddingTop:150}}></div>
        <div ref={scrollRef}>
            {Render()}
        </div>
        <div style={{paddingTop:50}}></div>
        <div style={{textAlign:'center'}}><button onClick={handletopScroll} className='butt-m-arr'><IoIosArrowUp/></button></div>
        <div style={{paddingTop:50}}></div>
        
      </MediaQuery>
      
      
    </div>
  )
}

export default Admin
