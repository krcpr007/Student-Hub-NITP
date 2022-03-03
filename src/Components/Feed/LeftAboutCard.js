import React, { useContext , useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import  ContextProvider  from '../context/ContextProvider';
function LeftAboutCard() {
    const {darkMode ,profileData,userInformation} = useContext(ContextProvider); 
    const auth = getAuth(); 
    useEffect(() => {
        userInformation();
    }, [])
    
    return (
        <div className={`shadow w-3/4 mt-2 rounded ml-5 ${darkMode?'bg-slate-900 text-white':null}`}>
            <div className='ml-0 mt-2 p-2'>
               <Link to="/profile"><img src={profileData.profileImg || 'https://www.w3schools.com/howto/img_avatar.png'} alt="profile-pic" className='content-center rounded-full w-96' /></Link>
            </div>
            <h1 className='mt-1 font-medium text-xl text-center px-5'>{auth.currentUser.displayName?`${auth.currentUser.displayName}`:`${profileData.name}`}</h1>
            <p className='text-sm text-gray-500 px-5 text-center'>
            {profileData && profileData.headline}
            </p>
            <hr  className='my-2'/>
            <div className='px-5 text-sm text-gray-500'>
             <p >Number of followers <a href="/"> <span className='text-blue-500'> 3.5k</span> </a></p>
             <p>Profile views this month <a href="/"><span className='text-blue-500'>1.5k</span></a> </p>
             <p >Post views this month <a  href="/"><span className='text-blue-500'>33.5k</span></a> </p>
            </div>
        </div>
    )
}

export default LeftAboutCard; 
