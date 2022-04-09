import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'; 
function PrivateComp() {
    const localAuth = JSON.parse(localStorage.getItem('st-hub'));
    return localAuth? <Outlet/>:<Navigate to="/login"/> 
}

export default PrivateComp