import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'; 
// import {getAuth} from 'firebase/auth'
import {auth} from '../../Firebase'
function PrivateComp() {

    return auth.currentUser? <Outlet/>:<Navigate to="/login"/> 
}

export default PrivateComp