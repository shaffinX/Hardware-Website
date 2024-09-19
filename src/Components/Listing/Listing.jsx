import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {database} from '../../firebase';
import { ref,get } from 'firebase/database';
import './listing.css';
import Product from './product';
import MediaQuery from 'react-responsive';
import load from '../../Assets/loading.svg'
function NonTypeListing() {
    const {category} = useParams();
    const [name,setName]=useState('');
    const [data,setData] = useState([]); 
    const [loadState,setLoadState] = useState(true);
    async function getData()
    {
      const reference = ref(database,`${category}/`)
      get(reference).then((snapshot)=>{
        let temp = snapshot.val();
        let res=[];
        Object.values(temp).forEach(x => {
          res.push(x);
          
        });
        setData(res);
        setLoadState(false);
        
      }).catch((err)=>console.log(err))

    }
    useEffect(()=>{
      if(category==='TieHooks'){
        setName('Tie Hooks');
      }
      else if(category==='Rods'){
        setName('Curtain Rods');
      }
      else if(category==='Sliders'){
        setName('Drawer Sliders');
      }
      else if(category==='DLocks'){
        setName('Drawer Locks');
      }
      else if(category==='SLegs'){
        setName('Sofa Legs');
      }
      else if(category==='DHardW'){
        setName('Door Hardware');
      }
      else{
        setName(category);
      }
      getData();
      // eslint-disable-next-line
    },[])

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
  
    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <MediaQuery minWidth={1201}>
        <Container>
            <div style={{paddingTop:50}}></div>
        </Container>
        <Container style={{backgroundColor:'#fff',borderRadius:20}}>
            <Row>
              <Col style={{textAlign:'center',paddingTop:100}}>
                  <h1 className='headingCategoryProd'>{name}</h1>
                  <div style={{display:'flex',justifyContent:'center'}}><div style={{border:'2px solid #FA8241',width:'20%'}}></div></div>
              </Col>
            </Row>
            <div style={{paddingTop:100}}></div>
            {loadState?<div style={{justifyContent:'center',display:'flex'}}><img src={load} alt='#' width={100}/></div>:<></>}
            <div className='GridProductCatalog'>
              {currentProducts.map((x,i)=>(
                <div key={i}>
                  <Product datum={x} category={category}/>
                </div>

              ))}
            </div>

            <div style={{paddingTop:80}}></div>
            <div className="pagination">
              <h5 style={{paddingTop:5,paddingRight:5,fontWeight:'bold'}}>Page </h5>
              {[...Array(Math.ceil(data.length / productsPerPage)).keys()].map((number) => (
                <button key={number + 1} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              ))}
            </div>

            <div style={{paddingTop:100}}></div>
        </Container>
          <div style={{paddingTop:100}}></div>
      </MediaQuery>
      <MediaQuery maxWidth={1200}>
        <Container style={{backgroundColor:'#fff'}}>
          <Row>
            <Col style={{textAlign:'center',paddingTop:60}}>
              <h3 className='headingCategoryProd'>{name}</h3>
              <div style={{display:'flex',justifyContent:'center'}}><div style={{border:'2px solid #FA8241',width:'30%'}}></div></div>
            </Col>
          </Row>
          <div style={{paddingTop:60}}></div>
          {loadState?<div style={{justifyContent:'center',display:'flex'}}><img src={load} alt='#' width={50}/></div>:<></>}
          <div className='GridProductCatalog'>
            {currentProducts.map((x,i)=>(
              <div key={i}>
                <Product datum={x} category={category}/>
              </div>

            ))}
          </div>

          <div style={{paddingTop:80}}></div>
          <div className="pagination">
            <h6 style={{paddingTop:5,paddingRight:5,fontWeight:'bold'}}>Page </h6>
            {[...Array(Math.ceil(data.length / productsPerPage)).keys()].map((number) => (
              <button key={number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            ))}
          </div>

        </Container>

      </MediaQuery>
    </div>
  )
}

export default NonTypeListing
