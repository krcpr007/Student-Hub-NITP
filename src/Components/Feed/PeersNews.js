import React, { useContext } from 'react'
import ContextProvider from '../context/ContextProvider'
function PeersNews() {
    const {darkMode} = useContext(ContextProvider)
    return (
        <div className={`shadow mt-2 rounded-sm w-3/3 mr-8 ${darkMode?'bg-slate-900 text-white':null}`}>
           <h1 className='px-5 font-medium'>Peers in news</h1>
            <div className='px-5 text-xs font-medium'>
                <div className='mt-2' >
                    <a href='/'>Bhubens lorem ipsum Lorem ipsum dolor</a>
                    <span className='text-gray-500'>4d ago</span>
                </div>
                <div className='mt-2'>
                    <a href='/'>Bhubens lorem ipsum Lorem ipsum dolor</a>
                    <span className='text-gray-500'>4d ago</span>
                </div>
                <div className='mt-2'>
                    <a href='/'>Bhubens lorem ipsum Lorem ipsum dolor</a>
                    <span className='text-gray-500'>4d ago</span>
                </div>
                <div className='mt-2'>
                    <a href='/'>Bhubens lorem ipsum Lorem ipsum dolor</a>
                    <span className='text-gray-500'>4d ago</span>
                </div>
                <div className='py-2'>

            <button className='text-xs text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border-2 border-yellow-300 hover:text-white px-5 rounded-3xl'>More News</button>
                </div>

            </div>
            
        </div>
    )
}

export default PeersNews
