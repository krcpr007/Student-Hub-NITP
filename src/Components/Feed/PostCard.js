import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiFillLike } from 'react-icons/ai'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { FiLoader } from 'react-icons/fi'
import avatar from '../assets/img_avatar.png'
// import {FaShare} from 'react-icons/fa';
// import {RiSendPlaneFill} from 'react-icons/ri';
import ContextProvider from '../context/ContextProvider'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from '../../Firebase';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
function PostCard({ post, id, fetchPosts }) {
    const { profileData, darkMode } = useContext(ContextProvider);
    const [comments, setComments] = useState([])
    const [textComment, setTextComment] = useState("");
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(false);
    const [like, setLike] = useState({
        liked: post?.likes?.includes(profileData.uid),
        likeCount: post?.likes?.length,
    })
    const likeRef = doc(db, 'posts', id)
    //function to get posted content user data
    const userData = async () => {
        const docRef = doc(db, "users", post.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log(docSnap.data());
            setUser(docSnap.data());
            //   setLoader(false);
        }
    }
    useEffect(() => {
        userData();
        getComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // function to get all the comments of the post
    const getComments = () => {
        onSnapshot(likeRef, (snapShot) => {
            setComments(snapShot.data()?.comments)
        })
    }
    //function to like post or dislike post
    const likedPost = () => {
        const { likeCount, liked } = like;
        if (liked) {
            updateDoc(likeRef, {
                likes: arrayRemove(profileData.uid),
            }).then(() => {
                setLike({
                    ...like,
                    likeCount: likeCount - 1,
                    liked: !liked
                })
                console.log("Disliked")
            }).catch((e) => {
                console.log(e);
            })
        } else {
            updateDoc(likeRef, {
                likes: arrayUnion(profileData.uid)
            }).then(() => {
                setLike({
                    ...like,
                    likeCount: likeCount + 1,
                    liked: !liked
                })
                console.log("Liked")
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    // function to detect is any hyperlink is there in string/text post
    function linkIfy(text) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url) {
            return '<a style="color:#70B5F9;text-decoration:underline" className="hover:underline" href="' + url + '">' + url + '</a>';
        });
    }
    //deleting the function
    const handleDeletePost = async (id) => { //function for delete the post and details OP
        try {
            const yes = window.confirm("Confirm Do you want to delete?")
            if (yes) {
                setLoader(true);
                if (post.forDeletePath) { await deleteObject(ref(storage, post.forDeletePath)); } //deleting the image of member // data.imgPath
                await deleteDoc(doc(db, 'posts', id)); //deleting the data of post 
                setLoader(false)
                toast.success("Post Deleted")
                fetchPosts() // calling fetch  function again

            }
        } catch (error) {
            toast.error("Something went Wrong");
            setLoader(false)
            console.log(error)
        }
    }
    const commentRef = doc(db, 'posts', id)
    const handleChangeComment = (e) => {
        if (textComment.length !== "") {
            updateDoc(commentRef, {
                comments: arrayUnion({
                    user: profileData.uid,
                    userName: profileData.name,
                    comment: textComment,
                    createdAt: new Date(),
                    commentId: uuidv4(),
                }),
            }).then(() => {
                setTextComment("")
            });
        }else{
            alert("please enter ")
        }
    };

    return (
        <>
            <div className={`mt-3 shadow rounded mb-5 m-2 ${darkMode ? 'bg-slate-900 text-white shadow-yellow-500' : null}`}>
                <div className='flex'>
                    <div className='m-1'>
                        <Link to={`/user/${user.uid}`}><img src={user.profileImg} alt="" className='w-10 rounded-3xl border-2 border-gray-400' /></Link>
                    </div>
                    <div className='m-1'>
                        <h1 className='font-medium'><Link to={`/user/${user.uid}`}>{user.name}</Link></h1>
                        <p className='text-xs'>{user.headline}</p>
                    </div>
                    {user.uid === profileData.uid && (<>
                        <div className='inset-x-0 '>
                            {loader ? <><FiLoader className="text-xl" /></> : <><RiDeleteBack2Fill className='text-2xl cursor-pointer' title='Delete Post' onClick={e => handleDeletePost(id)} /></>}
                        </div>
                    </>)}
                </div>
                <div>
                    <div className='p-3 text-justify'>
                        {<p dangerouslySetInnerHTML={{ __html: linkIfy(post.text) }} />}
                    </div>
                    {post.imgPath ? <img src={post.imgPath} alt="post-pic" className=' p-2 rounded-lg w-full' /> : null}
                    <div className='flex p-1 text-xs mb-2 font-serif'>
                        <p>{like.liked ? `You, and ${parseInt(like.likeCount) - 1}` : parseInt(like.likeCount)} like</p>
                        <p className='text-left ml-12 mx-2'>{comments.length} comments </p>
                    </div>
                </div>
                <hr />
                <div className='flex px-4 py-1 font-serif'>
                    <div className='cursor-pointer py-1' onClick={likedPost} >
                        <button className='hover:bg-gray-200 rounded-md'>{like.liked ? <><AiFillLike className={`inline text-rose-500 text-3xl`} fill="red" /> liked</> : <>
                            <AiFillLike className={`inline text-rose-500 text-2xl`} /><span className=''> like</span></>}</button>
                    </div>
                </div>
                <div className='flex p-2'>
                    <div className='mx-2'>
                        <img src={profileData.profileImg ? profileData.profileImg : null || avatar} alt="" className='w-8 rounded-3xl border-2 border-gray-400' />
                    </div>
                    <div className='w-full'>
                        <div className="flex overflow-hidden border rounded-lg border-yellow-500 lg:flex-row  focus-within:ring focus-within:ring-opacity-40 focus-within:border-yellow-500 focus-within:ring-yellow-500">
                            <input className="px-8 h-8 w-full" type="text" name="comment" placeholder={`Comment as ${profileData.name.toLowerCase()}`} value={textComment} onChange={e => setTextComment(e.target.value)} />
                            <button type='submit' className="border h-8 hover:shadow-amber-500 border-amber-500 px-3 font-medium rounded-lg  text-amber-500 hover:bg-amber-500 hover:text-slate-900  text-lg" onClick={handleChangeComment}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostCard
