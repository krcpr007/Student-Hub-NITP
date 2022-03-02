import React from 'react'
import { Link } from 'react-router-dom'
function SenderProfile() {
    return (
        <div>
            <div className='flex'>
                <div className='mt-2'>
                    <Link to="/users/:id"><img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="" className='w-16 rounded-full border-2 border-gray-400' /></Link>
                </div>
                <div className='m-1'>
                    <h1 className='font-medium'><Link to="/chat/:user">lorem ipsum</Link></h1>
                    <p className='text-xs'>Full stack MERN Developer|| CSE Student at NITP || React Fronted Developer</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default SenderProfile