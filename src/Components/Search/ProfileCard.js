import React from 'react'
import Img from '../assets/img_avatar.png'
import { Link } from 'react-router-dom'

function ProfileCard({ user }) {
    return (
        <div>
            <div className='card rounded-lg shadow-2xl w-52'>
                <div>
                    <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80" alt="" className='rounded-t' />
                    <img src={`${user.profileImg}` || Img} alt="" className='rounded-full w-1/3 relative bottom-10 left-16' />
                </div>
                <div className='text-center relative bottom-8'>
                    <h1>{user.name}</h1>
                    <p className='opacity-75'>{user.headline?`${user.headline?.substring(0,20)}...`:null}</p>
                    {/* <button className='bg-yellow-400 rounded'>Message</button> */}
                    <Link to={`/chat/${user.uid}`} title="Message" className="text-md shadow-2xl text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-1.5 py-0.5 rounded-md">Message</Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard