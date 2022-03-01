import { getAuth } from 'firebase/auth'
import React from 'react'
import {IoMdPhotos} from 'react-icons/io'
import {MdVideoLibrary} from 'react-icons/md'
import {MdEventAvailable} from 'react-icons/md'
function NewPost() {
    const auth = getAuth();
    return (
        <div className='sm:w-3/4 lg:w-2/3 shadow rounded'>
            <div className='flex p-2 m-2'>
            <img src={`${auth.currentUser?auth.currentUser.photoURL:'https://avatars.githubusercontent.com/u/80947662?v=4'}`} alt="" className='w-10 rounded-3xl border-2 border-gray-400' />
             <input type="text" className='px-8 border-2 w-full border-gray-300 rounded-3xl' placeholder='Start a conversation' />
            </div> 
            <div className=' p-2  '>
                <span className='mx-6'>
                <IoMdPhotos className='inline' color="gold" /> Photos
                </span>
                <span className='mr-6'>
            <MdVideoLibrary color="gold" className='inline '/> Videos 

                </span>
            <MdEventAvailable color="gold" className='inline'/> Events
            </div>

        </div>
    )
}

export default NewPost
