import avatar from '../assets/img_avatar.png'
import {Link} from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { IoMdPhotos } from 'react-icons/io'
import { MdVideoLibrary } from 'react-icons/md'
import { MdEventAvailable } from 'react-icons/md'
import ContextProvider from '../context/ContextProvider'
function NewPost() {
    const { darkMode, userInformation, profileData } = useContext(ContextProvider);
    useEffect(() => {
        userInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`sm:w-3/4 lg:w-2/3 shadow rounded ${darkMode ? 'bg-slate-900 text-white' : null}`}>
            <div className='flex p-2 m-2'>
                <Link to='/profile'>
                <img src={profileData.profileImg || avatar} alt="" className='w-10 rounded-3xl border-2 border-gray-400' />
                </Link>
                <input type="text" className='px-8 border-2 w-full border-gray-300 rounded-3xl bg-gray-200 text-gray-900' placeholder='Start a conversation' />
            </div>
            <div className=' p-2  '>
                <span className='mx-6'>
                    <IoMdPhotos className='inline' color="gold" /> Photos
                </span>
                <span className='mr-6'>
                    <MdVideoLibrary color="gold" className='inline ' /> Videos

                </span>
                <MdEventAvailable color="gold" className='inline' /> Events
            </div>

        </div>
    )
}

export default NewPost
