import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/nitlogo.png'
function GroupsClub() {
    return (
        <div className={`m-2 mr-0 shadow ml-5  rounded dark:bg-slate-900 dark:text-white dark:shadow-yellow-500 w-60`}>
            <h1 className='px-5 font-bold text-sm text-center'>Your groups and clubs</h1>
            <div className='px-5'>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>IEEE SB NITP</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>Google Developers Club</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>Hackslash</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>NITP Developers</Link>
                </div>
                <div className='py-2 flex justify-center'>
                    <button className='text-xs text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border-2 border-yellow-300 hover:text-white px-4 py-0 rounded-3xl'>More Groups and club</button>
                </div>
            </div>
        </div>
    )
}

export default GroupsClub; 
