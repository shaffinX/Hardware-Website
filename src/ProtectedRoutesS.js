import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoutesS() {
    let auth = false;
    let tokken = Cookies.get('tokkenSign');
    if(tokken === 'kW9BSmL7YZxyOw70h2MaPEdfFvQ52bSC68dwXT8p7OrQBPJXCF8RGq2hMgtsBuzG'){
        auth = true;
    }
  return (
    auth?<Outlet/>:<Navigate to='/Login'/>
  )
}

export default ProtectedRoutesS
