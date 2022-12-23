import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/nitlogo.png'
function Opportunities() {
    return (
        <div className="shadow mt-2 rounded-lg rounded-t-none  w-full dark:bg-slate-900 dark:text-white dark:shadow-yellow-500 ">
            <h1 className='px-3 font-medium text-sm text-center'>Top opportunities for you</h1>
            <div className='px-2'>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>NIT Patna debating club</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>Join TNP Web Team</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>Hackslash Induction</Link>
                </div>
                <div className='text-sm flex mt-1'>
                    <img src={logo} alt="groups and club pic" className='w-10 rounded-md p-1' />
                    <Link to='/' className='hover:underline my-2.5'>E-CELL Induction</Link>
                </div>
                <div className='py-2 flex justify-center'>
                    <button className='text-xs text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border-2 border-yellow-300 hover:text-white px-4 py-0 rounded-3xl'>More opportunities</button>
                </div>
            </div>
        </div>
    )
}

export default Opportunities
