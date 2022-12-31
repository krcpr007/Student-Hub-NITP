import React, { useContext } from 'react'
import avatar from '../../assets/img_avatar.png'
import { Link } from 'react-router-dom';
import mainBuilding from '../../assets/mainBuilding.jpeg'
import ContextProvider from '../../context/ContextProvider';
function LeftAboutCard() {
    const { profileData } = useContext(ContextProvider);

    return (
        <div className="shadow mt-2 rounded ml-5 dark:bg-slate-900 dark:text-white dark:shadow-yellow-500 w-60">
            <img src={mainBuilding} alt="cover" className='rounded' />
            <div className='w-1/2 pt-2 hero container max-w-screen-lg mx-auto flex justify-center relative bottom-20'>
                <Link to="/profile"><img src={profileData.profileImg ? profileData.profileImg : avatar} alt="profile-pic" className='rounded-full border-2 border-yellow-400 ' /></Link>
            </div>
            <div className='relative bottom-16'>
                <h1 className='font-medium text-xl text-center px-5'>{profileData?.name}</h1>
                <p className='text-sm text-gray-500 px-5 text-center'>{profileData.headline || "---"}</p>
            </div>
            <div className=''>
                <hr className='' />
                <div className='px-5 text-sm text-gray-500 text-center'>
                    <p >Number of connections <Link to="/connections"> <span className='text-yellow-500'>: {profileData?.connections?.length}</span> </Link></p>
                    <p>connections Requests <Link to="/connections"><span className='text-yellow-500'>: {profileData?.connectionRequests?.length}</span></Link> </p>
                </div>
            </div>
        </div>
    )
}

export default LeftAboutCard; 
