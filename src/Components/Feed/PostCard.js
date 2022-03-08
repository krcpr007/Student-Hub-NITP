import React, { useContext } from 'react'
import {AiOutlineLike} from 'react-icons/ai'
import {BiCommentDots, BiLike} from 'react-icons/bi';
import {FaShare} from 'react-icons/fa';
import {RiSendPlaneFill} from 'react-icons/ri'
import  ContextProvider  from '../context/ContextProvider'
function PostCard() {
    const {darkMode} =useContext(ContextProvider); 
    return (
        <>
        <div className={` sm:w-3/4  mt-3 shadow lg:w-2/3 mb-5 ${darkMode?'bg-slate-900 text-white':null}`}>
            <div className='flex'>
          <div className='m-1'>
              <a href="/"><img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="" className='w-10 rounded-3xl border-2 border-gray-400' /></a>
          </div>
          <div className='m-1'>
              <h1 className='font-medium'><a href="/">lorem ipsum</a></h1>
              <p className='text-xs'>Full stack MERN Developer|| CSE Student at NITP || React Fronted Developer</p>
          </div>
            </div>
        <div>
            <p className='p-3 text-justify'>
            Hii all ,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nemo odio asperiores sunt minus dignissimos dolor, reprehenderit iure et consequuntur vero sit repellat, rerum culpa deserunt quam nulla maxime? Natus?
            </p>
            {/* <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80" alt="post-pic" className=' p-2 rounded-lg' /> */}
            <img src="Nit_patna.jpeg" alt="post-pic" className=' p-2 rounded-lg w-full' />
            <div className='flex p-1 text-xs mb-2'>
                <p> <BiLike className='inline' color='red'/> You, and 133 also like this</p>
                <p className='text-left ml-12 mx-2'>100 comments </p>
                <p className=''>65 shares</p>
            </div>
        </div>
            <hr />
            <div className='flex p-5'>
            <AiOutlineLike color='red' size="28" className='text-3xl inline'/> like
            <BiCommentDots color='red' size="28" className='text-3xl  inline'/> Comment 
            <FaShare color='red'className='text-3xl' size="28" /> Share 
            <RiSendPlaneFill color='red'className='text-3xl' size="28" /> Send
            </div>
            <div className='flex p-2'>
                <div className='mx-2'>
                <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="" className='w-8 rounded-3xl border-2 border-gray-400' />
                </div>
                <div className='w-full'>
                <input type="text" className='px-8 border-2 w-full border-gray-300 rounded-3xl' placeholder='Start a conversation' />
                </div>
            </div>
        </div>
        </>
    )
}
export default PostCard
