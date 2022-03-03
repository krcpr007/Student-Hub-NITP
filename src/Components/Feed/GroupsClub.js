import React, { useContext } from 'react'
import ContextProvider from "../context/ContextProvider";
function GroupsClub() {
    const { darkMode } = useContext(ContextProvider);
    return (
        <div className={` mt-2 shadow w-3/4 ml-5 rounded-md ${darkMode ? 'bg-slate-900 text-white' : null}`}>
            <h1 className='px-5 font-bold text-sm'>Your groups and clubs</h1>
            <div className='px-5'>
                <div className='text-sm flex mt-1'>
                    <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <a href='/' className='hover:underline'>Maharashtra debating club</a>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <a href='/' className='hover:underline'> The Journalists</a>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <a href='/' className='hover:underline'>Cricket club of india</a>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <a href='/' className='hover:underline'>NITP Developers</a>
                </div>
                <div className='py-2'>

                    <button className='text-xs text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border-2 border-yellow-300 hover:text-white px-4 py-0 rounded-3xl'>More Groups and club</button>
                </div>
            </div>
        </div>
    )
}

export default GroupsClub; 
