import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoutes() {
    let auth = false;
    let tokken = Cookies.get('tokkenSign');
    if(tokken === 'f5Z89Y7P3zfYdfKiZw8tctWarCsYCtDjLbCItSwt1FBZLqhMJH2UG2gxR7iWbd7Z'||tokken === 'kW9BSmL7YZxyOw70h2MaPEdfFvQ52bSC68dwXT8p7OrQBPJXCF8RGq2hMgtsBuzG'){
        auth = true;
    }
  return (
    auth?<Outlet/>:<Navigate to='/Login'/>
  )
}

export default ProtectedRoutes
