import React from 'react'
import { Link } from 'react-router-dom'
function PeersNews() {
    return (
        <div className="shadow  mt-2 rounded-lg rounded-b-none w-full dark:bg-slate-900 dark:text-white dark:shadow-yellow-500">
            <h1 className='px-5 font-medium text-center'>Peers in news</h1>
            <div className='px-5 text-xs font-medium'>
                <div className='mt-2' >
                    <Link to='/'>Bhubens lorem ipsum Lorem ipsum dolor</Link>
                    <span className='text-gray-500'> 1d ago</span>
                </div>
                <div className='mt-2'>
                    <Link to='/'>Bhubens lorem ipsum Lorem ipsum dolor</Link>
                    <span className='text-gray-500'> 2d ago</span>
                </div>
                <div className='mt-2'>
                    <Link to='/'>Bhubens lorem ipsum Lorem ipsum dolor</Link>
                    <span className='text-gray-500'> 4d ago</span>
                </div>
                <div className='mt-2'>
                    <Link to='/'>Bhubens lorem ipsum Lorem ipsum dolor</Link>
                    <span className='text-gray-500'> 7d ago</span>
                </div>
                <div className='py-2 flex justify-center'>
                    <button className='text-xs text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border-2 border-yellow-300 hover:text-white px-5 rounded-3xl'>More News</button>
                </div>

            </div>

        </div>
    )
}

export default PeersNews
