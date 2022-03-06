import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../assets/img_avatar.png'
function SenderProfile({sender}) {
    return (
        <div>
            <div className='flex'>
                <div className='mt-2'>
                    <Link to={`/user/${sender.uid}`}><img src={sender.profileImg ||Img } alt="" className='w-16 rounded-full border border-slate-900' /></Link>
                </div>
                <div className='m-1'>
                    <h1 className='font-medium'><Link to={`/chat/${sender.uid}`}>{sender.name?sender.name:"Lorem ipsum"}</Link></h1>
                    <p className='text-xs'>{sender.headline? sender.headline:null}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default SenderProfile