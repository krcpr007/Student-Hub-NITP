import React from 'react'
import SenderProfile from './SenderProfile'
import {BsUpload} from 'react-icons/bs'
function Chat() {
  return (
    <>
        <div>
            <SenderProfile/>
            <div className='p-5'>
                
            </div>
            <div className='relative bottom-0 flex'>
                <BsUpload className=''/>
                <input type="text" className='bg-gray-500 px-2 py-2 w-3/4' />
                <button className='bg-yellow-300 px-2 py-2 rounded-r'>Send</button>
            </div>
        </div>
    </>
  )
}

export default Chat