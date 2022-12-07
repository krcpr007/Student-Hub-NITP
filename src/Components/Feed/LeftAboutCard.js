import React, { useContext, useEffect } from 'react'
import avatar from '../assets/img_avatar.png'
import { Link } from 'react-router-dom';
// import {auth} from '../../Firebase'
import mainBuilding from '../assets/mainBuilding.jpeg'
import ContextProvider from '../context/ContextProvider';
function LeftAboutCard() {
    const { profileData, userInformation } = useContext(ContextProvider);
    useEffect(() => {
        userInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`shadow mt-2 rounded-lg rounded-b-none ml-5 dark:bg-slate-900 dark:text-white dark:shadow-yellow-500`}>
            <img src={mainBuilding} alt="" />
            <div className='w-1/2 pt-2 hero container max-w-screen-lg mx-auto flex justify-center relative bottom-20'>
                <Link to="/profile"><img src={profileData.profileImg ? profileData.profileImg : null || avatar} alt="profile-pic" className='rounded-full border-2 border-yellow-400 ' /></Link>
            </div>
            <div className='relative bottom-16'>
                <h1 className='font-medium text-xl text-center px-5'>{profileData?.name}</h1>
                <p className='text-sm text-gray-500 px-5 text-center'>{profileData && profileData.headline}</p>
            </div>
            <div className='mt-1'>
                <hr className='my-2' />
                <div className='px-5 text-sm text-gray-500'>
                    <p >Number of followers <a href="/"> <span className='text-blue-500'> 3.5k</span> </a></p>
                    <p>Profile views this month <a href="/"><span className='text-blue-500'>1.5k</span></a> </p>
                    <p >Post views this month <a href="/"><span className='text-blue-500'>33.5k</span></a> </p>
                </div>
            </div>
        </div>
    )
}

export default LeftAboutCard; 
