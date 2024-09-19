import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './home.css'
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import ShopNow from './ShopNow';
function Home() {
  let category = ['Finials','Drawer Handles','Cabinet Handles','Hinges','Drawer Sliders','Sofa Legs','Tie Hooks','Curtain Rods','Curtain Brackets','Drawer Locks','Door Hardware','Main Door Handles','Main Gate Handles'];
  let img = [require('../../Assets/finial.jpg'),require('../../Assets/handle.jpg'),require('../../Assets/cabinet.jpg'),require('../../Assets/hinge.jpg'),require('../../Assets/slider.jpg'),require('../../Assets/sofaleg.jpg'),require('../../Assets/tiehook.jpg'),require('../../Assets/rod.jpg'),require('../../Assets/bracket.jpg'),require('../../Assets/drlock.jpeg'),require('../../Assets/door.jpg'),require('../../Assets/custom.jpg'),require('../../Assets/gate.jpg')]
  let link=['/Product-Category/Finials','/Product-Category-t/Drawer Handles','/Product-Category-t/Cabinet Handles','/Product-Category/Hinges','/Product-Category/Sliders','/Product-Category/SLegs','/Product-Category/TieHooks','/Product-Category/Rods','/Product-Category/Brackets','/Product-Category/DLocks','/Product-Category/DHardW','/Product-Category-t/Main Door','/Product-Category-t/Main Gates']
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  let images = [require('../../Assets/home.jpg'),require('../../Assets/home2.jpg'),require('../../Assets/home3.jpg')]

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // Start fading out the current image

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setVisible(true); // Start fading in the new image
      }, 500); // Delay to match the CSS transition duration
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);
  
  
  return (
    <div>
      <MediaQuery minWidth={481}>
        <div className='adv'>
          <img src={images[currentImageIndex]} alt={images[currentImageIndex]} className={`advimg ${visible ? 'visible' : ''}`} />
        </div>
        <Container>
          <Row>
              <Col style={{textAlign:'center',paddingTop:100}}>
                  <h1 className='HeadHm'>CATEGORIES</h1>
              </Col>
          </Row>
          <div className="lineB"></div>
          <div style={{paddingTop:50}}></div>
          <div className='containCate'>
            {category.map((x,i)=>(
              <div key={i} style={{ paddingLeft: 30 }}>
                <div className='catebox'>
                  <Link to={link[i]}><img src={img[i]} alt={img[i]} className='cateImg'/></Link>
                  <Link to={link[i]} style={{textDecoration:'none',color:'black'}}><h5 className='CateText'>{x}</h5></Link>
                </div>
              </div>
            ))}

          </div>
          <div style={{paddingTop:50}}></div>
          <Row>
              <Col style={{textAlign:'center',paddingTop:100}}>
                  <h1 className='HeadHm'>SHOP NOW</h1>
              </Col>
          </Row>
          <div className="lineB"></div>
          <div style={{paddingTop:50}}></div>
          <ShopNow/>
          
          <div style={{paddingTop:200}}></div>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={480}>
        <div className='adv'>
          <img src={images[currentImageIndex]} alt={images[currentImageIndex]} className={`advimg-m ${visible ? 'visible' : ''}`} />
        </div>
        <Container>
          <Row>
              <Col style={{textAlign:'center',paddingTop:50}}>
                  <h4 className='HeadHm'>CATEGORIES</h4>
              </Col>
          </Row>
          <div className="lineB"></div>
          <div style={{paddingTop:10}}></div>
          <div className='containCate'>
            {category.map((x,i)=>(
              <div key={i} style={{ paddingLeft: 20 }}>
                <div className='catebox-m'>
                  <Link to={link[i]}><img src={img[i]} alt={img[i]} className='cateImg-m'/></Link>
                  <Link to={link[i]} style={{textDecoration:'none',color:'black'}}><h6 className='CateText'>{x}</h6></Link>
                </div>
              </div>
            ))}

          </div>
          <div style={{paddingTop:50}}></div>
          <Row>
              <Col style={{textAlign:'center',paddingTop:100}}>
                  <h1 className='HeadHm'>SHOP NOW</h1>
              </Col>
          </Row>
          <div className="lineB"></div>
          <div style={{paddingTop:50}}></div>
          <ShopNow/>
          
          <div style={{paddingTop:200}}></div>
        </Container>
      </MediaQuery>
      
    </div>
  )
}

export default Home
