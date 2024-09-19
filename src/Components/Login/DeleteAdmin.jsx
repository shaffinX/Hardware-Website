import React, { useEffect, useState } from 'react'
import {get,ref,remove} from 'firebase/database'
import { database } from '../../firebase';
import { Container } from 'react-bootstrap';
function DeleteAdmin() {
    const[data,setData]=useState([]);
    useEffect(()=>{
        const reference = ref(database,'admins/')
        get(reference).then((snapshot)=>{
            let x = Object.values(snapshot.val());
            let res=[];
            for (let i = 0; i < x.length; i++) {
               if(x[i].admin==='admin'){
                    res.push(x[i]);
               }
            }

            setData(res);
        })
    },[])
    function Delete(name)
    {
        const reference = ref(database,'admins/'+name)
        remove(reference).then(()=>{
            window.location.reload();
        });

    }
  return (
    <div>
        <Container>
            <h1 style={{paddingTop:50,paddingBottom:50,textAlign:'center',fontWeight:'bolder'}}> Delete Admin</h1>
            <div className="table-container">
                <table className='head-table'>
                    <thead >
                        <tr>
                            <th>Delete</th>
                            <th>Admin</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val,i)=>(
                            <tr key={i}>
                                <td><button onClick={()=>{Delete(val.name)}}>Delete</button></td>
                                <td>{val.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
      
    </div>
  )
}

export default DeleteAdmin
