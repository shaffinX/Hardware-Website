import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styling.css';
import { get, ref, remove } from 'firebase/database';
import { database,Storage } from '../../../firebase';
import loader from '../../../Assets/loading.svg';
import { ref as stref, deleteObject, listAll } from 'firebase/storage';
function DeleteType({store,name}) {
    const [data,setData] = useState([]);
    const [load,setload] = useState(false);
    async function getData()
    {
        const reference = ref(database,`${store}/`);
        get(reference).then((snapshot)=>{
            if(snapshot.exists()){
                setData(Object.values(snapshot.val()));
            }
            else{
                setData([]);
            }
            
        }).catch((err)=>console.log(err));
    }
    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[name])
    const deleteImage= async(prt)=>{
        const reference = stref(Storage,`${store}/${prt}`);
        const res = await listAll(reference);
        res.items.map((itemRef) => {
            return deleteObject(itemRef)
        });
    }
    async function Delete(prt)
    {
        setload(true);
        await deleteImage(prt);
        const reference = ref(database,`${store}/${prt}`);
        remove(reference);
        setTimeout(()=>{
            setload(false);
            window.location.reload();
        },500)
    }
  return (
    <div>
        <Container>
            <Row>
                <Col style={{textAlign:'center'}}>
                    <h1 className='headingS'>Delete {name}</h1>{load?<img src={loader} alt={loader} width={50}/>:<></>}
                </Col>
            </Row>

            <div className="table-container">
                <table className='head-table'>
                    <thead >
                        <tr>
                            <th>Img</th>
                            <th>Partno</th>
                            <th>Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val,i)=>(
                            <tr key={i}>
                                <td><img src={`${val.url1}`} alt={`${val.url1}`} width={100}/></td>
                                <td>{val.partno}</td>
                                <td>{val.name}</td>
                                <td><button onClick={()=>{Delete(val.partno)}}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    </div>
  )
}

export default DeleteType
