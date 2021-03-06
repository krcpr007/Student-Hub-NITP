import React, { useContext , useEffect } from 'react'
import avatar from '../assets/img_avatar.png'
import { Link } from 'react-router-dom';
// import {auth} from '../../Firebase'
import  ContextProvider  from '../context/ContextProvider';
function LeftAboutCard() {
    const localAuth = JSON.parse(localStorage.getItem('st-hub'));
    const {darkMode ,profileData,userInformation} = useContext(ContextProvider); 
    useEffect(() => {
        userInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className={`shadow mt-2 rounded-lg rounded-b-none ml-5 ${darkMode?'bg-slate-900 text-white shadow-yellow-500':null}`}>
            <div className='ml-0 mt-2 p-2 w-40 flex'>
               <Link to="/profile"><img src={profileData.profileImg?profileData.profileImg:null || avatar} alt="profile-pic" className=' lg:mx-5 rounded-full border-2 border-yellow-400' /></Link>
            </div>
            <h1 className='mt-1 font-medium text-xl text-center px-5'>{localAuth.displayName?`${localAuth.displayName}`:`${profileData.name}`}</h1>
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
