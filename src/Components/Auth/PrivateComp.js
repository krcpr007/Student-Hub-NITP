import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'; 
import {getAuth} from 'firebase/auth'
function PrivateComp() {
    const auth = getAuth(); 
    return auth.currentUser? <Outlet/>:<Navigate to="/login"/> 
}

export default PrivateComp