import React, { useContext ,useEffect , useState} from 'react'; 
import { Link } from 'react-router-dom';
import {AiOutlineLike} from 'react-icons/ai'
import {BiCommentDots, BiLike} from 'react-icons/bi';
import {FaShare} from 'react-icons/fa';
import {RiSendPlaneFill} from 'react-icons/ri';
import  ContextProvider  from '../context/ContextProvider'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase';
function PostCard({post}) {
    // console.table(post.imgPath)
    const {darkMode} =useContext(ContextProvider); 
    const [user , setUser] = useState({})
    const [liked , setLiked] = useState(false); 
    useEffect(()=>{
        const userData = async()=>{

            const docRef = doc(db, "users", post.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log(docSnap.data());
              setUser(docSnap.data());
            //   setLoader(false);
            }
          }
          userData();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const likedPost = ()=>{
       
    }
    return (
        <>
        <div className={`mt-3 shadow rounded mb-5 m-2 ${darkMode?'bg-slate-900 text-white shadow-yellow-500':null}`}>
            <div className='flex'>
          <div className='m-1'>
              <Link to={`/user/${user.uid}`}><img src={user.profileImg} alt="" className='w-10 rounded-3xl border-2 border-gray-400' /></Link>
          </div>
          <div className='m-1'>
              <h1 className='font-medium'><Link to={`/user/${user.uid}`}>{user.name}</Link></h1>
              <p className='text-xs'>{user.headline}</p>
          </div>
            </div>
        <div>
            <p className='p-3 text-justify'>
            {post.text}
            </p>
            {post.imgPath?<img src={post.imgPath} alt="post-pic" className=' p-2 rounded-lg w-full' />:null}
            <div className='flex p-1 text-xs mb-2'>
                <p> <BiLike className='inline' color='red'/> You, and {post.likes} liked</p>
                {/* <p className='text-left ml-12 mx-2'>100 comments </p>
                <p className=''>65 shares</p> */}
            </div>
        </div>
            <hr />
            <div className='flex px-5 py-2'>
            <span className='hover:bg-gray-400 cursor-pointer p-1 rounded' onClick={likedPost} ><AiOutlineLike className='inline text-rose-500 text-3xl'/> like</span>
            {/* <BiCommentDots color='red' size="28" className='text-3xl  inline'/> Comment 
            <FaShare color='red'className='text-3xl' size="28" /> Share 
            <RiSendPlaneFill color='red'className='text-3xl' size="28" /> Send */}
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
