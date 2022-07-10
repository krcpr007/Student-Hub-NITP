import React, { useContext } from 'react'
import  ContextProvider  from '../context/ContextProvider'
function Opportunities() {
    const {darkMode} = useContext(ContextProvider); 
    return (
        <div className={`shadow mt-2 rounded-lg rounded-t-none  w-full ${darkMode?'bg-slate-900 text-white shadow-yellow-500':null}`}>
           <h1 className='px-3 font-medium text-sm'>Top opportunities for you</h1>
            <div className='px-2'>
                <div className='text-sm flex mt-1'>
                <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="pic" className='w-10 rounded-md p-1'/>
                 <a href='/' className='text-blue-400 hover:underline'>Maharashtra debating club</a>
                </div>
                <div className='text-sm flex mt-1'>
                <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1'/>
                 <a href='/' className='text-blue-400 hover:underline'> The Journalists</a>
                </div>
                <div className='text-sm flex mt-1'>
                <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1'/>
                 <a href='/' className='text-blue-400 hover:underline'>Cricket club of india</a>
                </div>
                <div className='text-sm flex mt-1'>
                <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="groups and club pic" className='w-10 rounded-md p-1'/>
                 <a href='/' className='text-blue-400 hover:underline'>NITP Developers</a>
                </div> 
                <div className='py-2'>
            <button className='text-xs text-blue-400 outline-2 outline-blue-400 hover:bg-blue-400 border-2 border-blue-300 hover:text-white px-5 rounded-3xl'>More opportunities</button>
                </div>
            </div>
        </div>
    )
}

export default Opportunities
