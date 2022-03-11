import React from 'react'
import Img from '../assets/img_avatar.png'
function ProfileCard() {
    return (
        <div>
            <div className='card rounded-lg shadow-2xl bg-slate-500 w-52'>
                <div>
                    <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80" alt="" className='rounded-t' />
                    <img src={Img} alt="" className='rounded-full w-1/3 relative bottom-10 left-16' />
                </div>
                <div className='text-center relative bottom-8'>
                <h1>Rajan Kumar</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non recusandae est nulla!</p>
                <button className='bg-yellow-400 rounded'>Message</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard