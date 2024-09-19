import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { database } from '../../../firebase';
import {set,ref as dbref, get} from 'firebase/database';
import ringload from '../../../Assets/loading.svg';
import './styling.css'
function Update({name,store}) {
    const [nameF,setNameF] = useState('');
    const [price,setPrice] = useState(0);
    const [desc,setDesc] = useState('');
    const [img1,setImg1] = useState(null);
    const [img2,setImg2] = useState(null);
    const [prt,setPrt] = useState('');
    const [CP,setCP] = useState(0);
    const [loading,setLoad] = useState(false);
    const [sizes,setSizes] = useState([]);
    const [stock,setStock] = useState(true);
    const [material,setMaterial]=useState('');

    async function Update()
    {
        if(nameF&&price&&desc){
            setLoad(true);
            const refer = dbref(database,`${store}/${prt}`);
            set(refer,{
                partno:prt,
                name:nameF,
                cp:CP,
                price:price,
                description:desc,
                size:sizes,
                stock:stock,
                material:material,
                url1:img1,
                url2:img2
            
            }).then(()=>{
                setLoad(false);
                alert(`${name} Updated Successfully.`)
            })
            .catch((err)=>{console.log(err);})

        }
        else{
            alert('Fill All the Fields')
        }
    }


    function search()
    {
        const refer = dbref(database,`${store}/${prt}`);
        get(refer).then((snapshot)=>{
            if(snapshot.exists()){
                setNameF(snapshot.val().name);
                setDesc(snapshot.val().description)
                setPrice(snapshot.val().price);
                setImg1(snapshot.val().url1);
                setImg2(snapshot.val().url2);
                setCP(snapshot.val().cp);
                setSizes(snapshot.val().size);
                setStock(snapshot.val().stock);
                setMaterial(snapshot.val().material);
            }
            else{
                alert('No Part Found');
            }
        })
    }
  return (
    <div>
        <Container>
        <Row>
            <Col style={{textAlign:'center'}}>
                <h1 className='headingS'>Update {name}</h1>
            </Col>
        </Row>
        <div style={{width:'100%',justifyContent:'center',display:'flex',paddingTop:'5%'}}>
            <div style={{width:'70%'}}>
                <div style={{display:'flex'}}>
                    <input type="text" className="form-control border-inp"  placeholder="Part Number" onChange={(e)=>{setPrt(e.target.value)}}  value={prt} maxLength={6}/>
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={search}>Search</button>
                </div>
                <div style={{paddingTop:10}}></div>
                <input type="text" className="form-control border-inp"  placeholder={`Name of the ${name}`} onChange={(e)=>{setNameF(e.target.value)}} value={nameF}/>
                <div style={{paddingTop:10}}></div>
                <input type="number" className="form-control border-inp" placeholder="Price (Rs)" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
                <div style={{paddingTop:10}}></div>
                <textarea class="form-control border-inp" placeholder='Description' rows={5} onChange={(e)=>{setDesc(e.target.value)}} value={desc}/>
                <div style={{paddingTop:10}}></div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={stock===true} onClick={()=>{setStock(true)}}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        In Stock
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={stock===false} onClick={()=>{setStock(false)}}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Out of Stock
                    </label>
                </div>
                <div style={{paddingTop:10}}></div>
                <div style={{textAlign:'center'}}>
                    <button className='buttonHrd' onClick={Update}>UPDATE</button>
                    
                </div>
                <div style={{textAlign:'center',paddingTop:10}}>
                    {loading?<img src={ringload} alt={ringload} width={50}/>:<></>}
                </div>
                
            </div>
                
        </div>
        </Container>
    </div>
  )
}

export default Update
