import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {database} from '../../firebase';
import { Col, Container, Row } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
import './productdisplay.css';
import MediaQuery from 'react-responsive';
import RelatedProductsT from './RelatedProductsT';
function ProductDisplayT({AddToCart}) {
    const {category,partno}=useParams();
    const [data, setData]=useState({size:[]});
    const [imgButt,setImage]=useState('');
    const [qnt,setQnt]=useState(1);
    const [size,setSize]=useState('');

    function getData(store){
        const reference = ref(database,`${store}/${partno}`)
        get(reference).then((snapshot)=>{
            let temp = snapshot.val();
            setData(temp);
            setImage(temp.url1);
        }).catch((err)=>console.log(err))
    }
    useEffect(()=>{
        if(category==='Cabinet Handles'){
            getData('Handles');
        }
        if(category==='Drawer Handles'){
            getData('Handles');
        }
        if(category==='Main Door'){
            getData('CHandles');
        }
        if(category==='Main Gate'){
            getData('CHandles');
        }
        // eslint-disable-next-line
    },[])

    const HandleQuantity=(e)=>{
      if(e.target.value<=0){
        setQnt(1);
      }
      else{
        setQnt(e.target.value);
      }
    }

    const convertNewLinesToBreaks = (text) => {
      if(text){
        return text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
              {line}
              <br />
          </React.Fragment>
        ));
      }
      else{
        return text;
      }
     
    };
    const selector = (e)=>{
      setSize(e.target.value)
    }
    function CartFunc()
    {
      if(size){
        AddToCart({url:data.url1,name:data.name,price:data.price,partno:partno,size:size,quantity:qnt,cp:data.cp});
        window.location.href='/Cart'
      }
      else{
        alert('Please select the Size.')
      }
    }


  return (
    <div>
      <MediaQuery minWidth={1000}>
        <Container>
          <div style={{paddingTop:100}}></div>
          <Row>
            <Col>
              <div className='imageContainerZoom'>
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: '#',
                    isFluidWidth: true,
                    src: imgButt,
                  },
                  largeImage: {
                    src: imgButt,
                    width: 1000,
                    height: 1000
                  }
                }} />
              </div>
              <div style={{paddingTop:30}}></div>
              <div style={{display:'flex'}}>
                <img src={data.url1} alt='#' className={`imageButtonCC ${imgButt===data.url1?'active':''}`} onClick={()=>{setImage(data.url1)}}/>
                <div style={{paddingLeft:20}}></div>
                <img src={data.url2} alt='#' className={`imageButtonCC ${imgButt===data.url2?'active':''}`} onClick={()=>{setImage(data.url2)}}/>
              </div>
            </Col>
            <Col>
                <a href={`/Product-Category-t/${category}`}><h5>Product-Category / {category}</h5></a>
                <div style={{paddingTop:20}}></div>
                <h1 className='prodDisplayHead'>{data.name}</h1>
                <h3 className='prodDisplayHead'>Rs.{data.price}</h3>
                <div style={{paddingTop:50}}></div>
                <h5>Material: {data.material}</h5>
                <div style={{paddingTop:10}}>
                  <select class="form-select" aria-label="Default select example" value={size} onChange={selector}>
                    <option selected value={''}>Select Size</option>
                    {data.size.map((x,i)=>(
                        <option value={x} key={i}>{x}</option>
                    ))}
                          
                  </select>
                </div>
                <div style={{paddingTop:30}}></div>
                <h5 style={data.stock?{color:'green'}:{color:'red'}}>Rs.{qnt*data.price} {data.stock?'In Stock':'Out of Stock'}</h5>
                <div style={{paddingTop:50}}></div>
                <div className={data.stock?'prodQuantity':'disabled-content'}>
                  <div style={{width:'25%'}}>
                    <input type='number' value={qnt} onChange={HandleQuantity} className='prodQuantity-btn'/>
                  </div>
                  <div style={{width:'75%',paddingLeft:5}}>
                    <button className='prodCart-btn' onClick={CartFunc}>Add to Cart</button>
                  </div>
                </div>
            </Col>
          </Row>
          <div style={{paddingTop:50}}></div>
          <div className='lineB'></div>
          <Row style={{paddingTop:50}}>
            <Col>
              <h3 className='prodDisplayHead'>Description</h3>
              <p className='prodDescText'>{convertNewLinesToBreaks(data.description)}</p>
            </Col>
          </Row>
          <Row>
              <Col style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
                  <h3 className='prodDisplayHead'>Related Products</h3>
              </Col>
          </Row>
          <Row>
            <RelatedProductsT category={category}/>
          </Row>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={999}>
          <Container>
            <Row>
              <Col style={{justifyContent:'center',display:'flex'}}>
                <div className='imageContainerZoom' style={{justifyContent:'center',display:'flex'}}>
                  <img src={imgButt} alt='#' width={250}/>
                </div>
              </Col>
            </Row>
            <Row>
              <div style={{paddingTop:30}}></div>
              <div style={{display:'flex'}}>
                <img src={data.url1} alt='#' className={`imageButtonCC ${imgButt===data.url1?'active':''}`} onClick={()=>{setImage(data.url1)}}/>
                <div style={{paddingLeft:10}}></div>
                <img src={data.url2} alt='#' className={`imageButtonCC ${imgButt===data.url2?'active':''}`} onClick={()=>{setImage(data.url2)}}/>
              </div>
            </Row>
            <Row>
              <div style={{paddingTop:50}}></div>
              <h3 className='prodDisplayHead'>{data.name}</h3>
              <h5 className='prodDisplayHead'>Rs.{data.price}</h5>
              <div style={{paddingTop:30}}></div>
              <h6>Material: {data.material}</h6>
            </Row>
            <Row>
              <div style={{paddingTop:10}}>
                  <select class="form-select" aria-label="Default select example" value={size} onChange={selector}>
                    <option selected value={''}>Select Size</option>
                    {data.size.map((x,i)=>(
                        <option value={x} key={i}>{x}</option>
                    ))}
                          
                  </select>
              </div>
            </Row>
            <Row>
              <div style={{paddingTop:30}}></div>
                <h5 style={data.stock?{color:'green'}:{color:'red'}}>Rs.{qnt*data.price} {data.stock?'In Stock':'Out of Stock'}</h5>
                <div style={{paddingTop:20}}></div>
            </Row>
            <Row>
              <Col>
                <div className={data.stock?'prodQuantity':'disabled-content'}>
                  <div style={{width:'25%'}}>
                    <input type='number' value={qnt} onChange={HandleQuantity} className='prodQuantity-btn'/>
                  </div>
                  <div style={{width:'75%',paddingLeft:5}}>
                    <button className='prodCart-btn' onClick={CartFunc}>Add to Cart</button>
                  </div>
                </div>
              </Col>
            </Row>
            <div style={{paddingTop:30}}></div>
            <div className='lineB'></div>
            <Row style={{paddingTop:20}}>
              <Col>
                <h3 className='prodDisplayHead'>Description</h3>
                <p className='prodDescText'>{convertNewLinesToBreaks(data.description)}</p>
              </Col>
            </Row>
            <Row>
              <Col style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
                  <h3 className='prodDisplayHead'>Related Products</h3>
              </Col>
            </Row>
            <Row>
              <RelatedProductsT category={category}/>
            </Row>


          </Container>
      </MediaQuery>
    </div>
  )
}

export default ProductDisplayT
