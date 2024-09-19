import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Storage,database } from '../../../firebase';
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {set,ref as dbref, get} from 'firebase/database';
import ringload from '../../../Assets/loading.svg';
import './styling.css'
function Create({store,name}) {
    const [nameF,setNameF] = useState('');
    const [price,setPrice] = useState(0);
    const [CP,setCP] = useState(0);
    const [desc,setDesc] = useState('');
    const [img1,setImg1] = useState(null);
    const [img2,setImg2] = useState(null);
    const [prt,setPrt] = useState('');
    const [loading,setLoad] = useState(false);
    const [sizes,setSizes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [material,setMaterial]=useState('');

    const imgUpload = async (altt) => {
        const reference = ref(Storage, `${store}/${prt}/${altt.name}`);
        const uploadImg = uploadBytesResumable(reference, altt);
        
        return new Promise((resolve, reject) => {
            uploadImg.on(
                'state_changed',
                (snapshot) => {
                    setLoad(true); // Update your state here if necessary
                },
                (error) => {
                    console.error(error);
                    reject(error); // Reject the promise if there's an error
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadImg.snapshot.ref);
                        resolve(downloadURL); // Resolve the promise with the download URL
                    } catch (error) {
                        console.error(error);
                        reject(error); // Reject the promise if there's an error getting the download URL
                    }
                }
            );
        });
    };

    async function Upload()
    {
        if(nameF&&price&&desc&&img1&&img2&&prt&&sizes&&CP&&material){
            
            
            const refer = dbref(database,`${store}/${prt}`);
            get(refer).then(async(snapshot)=>{
                if(snapshot.exists()){
                    alert('This Part already exists');
                }
                else{
                    let x = await imgUpload(img1)
                    let y = await imgUpload(img2)
                    setLoad(false);
                            
                    set(refer,{
                        partno:prt,
                        name:nameF,
                        cp:CP,
                        price:price,
                        description:desc,
                        size:sizes,
                        stock:true,
                        material:material,
                        url1:x,
                        url2:y
                    
                    }).then(()=>{
                        alert(`${name} Uploaded Successfully`)
                    })
                    .catch((err)=>{console.log(err);})
                }
            })
        }
        else{
            alert('Fill All the Fields')
        }
    }


    const handleAddSizes = () => {
        if (inputValue.trim() !== '') {
          setSizes([...sizes, inputValue.trim()]);
          setInputValue(''); // Clear input field after adding
        }
      };

  return (
    <div>
        <Container>
            <Row>
                <Col style={{textAlign:'center'}}>
                    <h1 className='headingS'>Upload {name}</h1>
                </Col>
            </Row>
            <div style={{width:'100%',justifyContent:'center',display:'flex',paddingTop:'5%'}}>
                <div style={{width:'70%'}}>
                    <input type="text" className="form-control border-inp"  placeholder="Part Number" onChange={(e)=>{setPrt(e.target.value)}} maxLength={6}/>
                    <div style={{paddingTop:10}}></div>
                    <input type="text" className="form-control border-inp"  placeholder={`Name of the ${name}`} onChange={(e)=>{setNameF(e.target.value)}}/>
                    <div style={{paddingTop:10}}></div>
                    <input type="number" className="form-control border-inp" placeholder="Cost Price (Rs)" onChange={(e)=>{setCP(e.target.value)}}/>
                    <div style={{paddingTop:10}}></div>
                    <input type="number" className="form-control border-inp" placeholder="Sell Price (Rs)" onChange={(e)=>{setPrice(e.target.value)}}/>
                    <div style={{paddingTop:10}}></div>
                    <textarea class="form-control border-inp" placeholder='Description' rows={5} onChange={(e)=>{setDesc(e.target.value)}}/>
                    <div style={{paddingTop:10}}></div>
                    <input type="text" className="form-control border-inp"  placeholder='Material' onChange={(e)=>{setMaterial(e.target.value)}}/>
                    <div style={{paddingTop:10}}></div>
                    <label>Add Sizes</label>
                    <div style={{display:'flex'}}>
                        <input type="text" className="form-control border-inp" value={inputValue} placeholder="Size" onChange={(e)=>{setInputValue(e.target.value)}} />
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAddSizes}>ADD</button>
                    </div>
                    {sizes.map((option, index) => (
                        <h6 key={index}>{option}</h6>
                    ))}

                    <label>Primary Image</label>
                    <input class="form-control" type="file" accept="image/*" onChange={(e)=>{setImg1(e.target.files[0])}}/>
                    <div style={{paddingTop:10}}></div>
                    <label>Secondary Image</label>
                    <input class="form-control" type="file" accept="image/*" onChange={(e)=>{setImg2(e.target.files[0])}}/>
                    <div style={{paddingTop:10}}></div>
                    <div style={{textAlign:'center'}}>
                        <button className='buttonHrd' onClick={Upload}>UPLOAD</button>
                        
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

export default Create
