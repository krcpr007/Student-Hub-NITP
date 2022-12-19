import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AiFillHeart } from 'react-icons/ai'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { FiLoader } from 'react-icons/fi'
import avatar from '../../assets/img_avatar.png'
import ContextProvider from '../../context/ContextProvider'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from '../../Firebase';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import Comments from './Comments';
import Moment from 'react-moment';
function PostCard({ post, id, fetchPosts }) {
    const { profileData } = useContext(ContextProvider);
    const [comments, setComments] = useState([])
    const [textComment, setTextComment] = useState("");
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(false);
    const [showComments, setShowComments] = useState(false);
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
        getLikes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // function to get all the comments of the post
    const getComments = () => {
        onSnapshot(likeRef, (snapShot) => {
            setComments(snapShot.data()?.comments)
        })
    }
    // function for get live count
    const getLikes = () => {
        onSnapshot(likeRef, (snapShot) => {
            setLike({
                ...like,
                liked: snapShot.data()?.likes?.includes(profileData.uid),
                likeCount: snapShot.data()?.likes?.length,
            })
        })
    }
    //function to like post or dislike post
    const likedPost = () => {
        const { likeCount, liked } = like;
        if (liked) {
            setLike({
                ...like,
                likeCount: likeCount - 1,
                liked: !liked
            })
            updateDoc(likeRef, {
                likes: arrayRemove(profileData.uid),
            }).then(() => {
                console.log("Disliked")
            }).catch((e) => {
                console.log(e);
                setLike({
                    ...like,
                    likeCount: likeCount + 1,
                    liked: !liked
                })
            })
        } else {
            setLike({
                ...like,
                likeCount: likeCount + 1,
                liked: !liked
            })
            updateDoc(likeRef, {
                likes: arrayUnion(profileData.uid)
            }).then(() => {
                console.log("Liked")
            }).catch((e) => {
                console.log(e);
                setLike({
                    ...like,
                    likeCount: likeCount - 1,
                    liked: !liked
                })
            })
        }
    }
    // function to detect is any hyperlink is there in string/text post
    function linkIfy(text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g
        return text.replace(urlRegex, function (url) {
            return '<a style="color:#70B5F9;text-decoration:underline" target="_blank" className="hover:underline" href="' + url + '">' + url + '</a>';
        });
    }
    //deleting the function
    const handleDeletePost = async (id) => { //function for delete the post and details OP
        const yes = window.confirm("Are sure you want to delete it?")
        if (yes) {
            try {
                setLoader(true);
                if (post.forDeletePath) { await deleteObject(ref(storage, post.forDeletePath)); } //deleting the image of member // data.imgPath
                await deleteDoc(doc(db, 'posts', id)); //deleting the data of post 
                setLoader(false)
                toast.success("Post Deleted")
                fetchPosts() // calling fetch  function again
            } catch (error) {
                toast.error("Something went Wrong");
                setLoader(false)
                console.log(error)
            }
        } else {

        }
    }
    const handleChangeComment = (e) => {
        // @TODO-> what if post is deleted and someone wants to connect 
        try {
            const commentRef = doc(db, 'posts', id)
            if (textComment?.length !== "") {
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
            } else {
                alert("please enter ")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong...")
        }
    };

    return (
        <>
            <div className={`mt-3 shadow rounded mb-5 m-2 dark:bg-slate-900 dark:text-white dark:shadow-yellow-500`}>
                <div className='flex relative'>
                    <div className='m-1'>
                        <Link to={post?.uid === profileData?.uid ? "/profile" : `/user/${user?.uid}`}><img src={user.profileImg} alt="" className='w-10 rounded-3xl border border-gray-400' loading='lazy' /></Link>
                    </div>
                    <div className='m-1'>
                        <div className='flex'>  <h1 className='font-medium'><Link to={post?.uid === profileData?.uid ? "/profile" : `/user/${user?.uid}`}>{user.name}</Link></h1><small className='text-xs opacity-50 m-1'>{<Moment fromNow>{post?.postedAt.toDate()}</Moment>}</small></div>
                        <p className='text-xs'>{user.headline}</p>
                    </div>
                    <div className=''>
                        {user.uid === profileData.uid && (<>
                            <div className=''>
                                {loader ? <><FiLoader className="text-xl absolute" /></> : <><RiDeleteBin2Fill className='text-2xl cursor-pointer absolute right-3 top-1 hover:text-red-600' title='Delete Post' onClick={e => handleDeletePost(id)} /></>}
                            </div>
                        </>)}
                    </div>
                </div>
                <div>
                    <div className='p-3 text-justify'>
                        {<p dangerouslySetInnerHTML={{ __html: linkIfy(post.text) }} />}
                    </div>
                    {post.imgPath ? <img src={post.imgPath} alt="post-pic" className=' p-2 rounded-lg w-full' loading='lazy' /> : null}
                    <div className='flex p-1 text-xs mb-2 font-serif relative'>
                        <div className='flex'>
                            <div className='cursor-pointer' onClick={likedPost} >
                            </div>
                        </div>
                        <div className='flex'>
                            <button className='rounded-md' onClick={likedPost}>{<AiFillHeart className="text-2xl" fill={`${like.liked ? 'red' : 'gray'}`} />}</button>
                            <p className='m-1'>{like.liked ? `You, and ${parseInt(like.likeCount) - 1}` : parseInt(like.likeCount)} like</p>
                            <button className='mx-2 py-2 px-1 hover:dark:bg-slate-800 hover:rounded absolute right-3 top-1' onClick={() => setShowComments(!showComments)}>{comments?.length} comments </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='flex p-2'>
                    <div className='mx-2'>
                        <img src={profileData.profileImg || avatar} alt="" className='w-10 rounded-3xl border-1 border-gray-400' loading='lazy' />
                    </div>
                    <div className='w-full'>
                        <div className="flex overflow-hidden border rounded-lg border-yellow-500 lg:flex-row  focus-within:ring focus-within:ring-opacity-40 focus-within:border-yellow-500 focus-within:ring-yellow-500">
                            <input className="px-8 h-8 w-full dark:text-black" type="text" name="comment" placeholder={`Comment as ${profileData?.name?.toLowerCase()}`} value={textComment} onChange={e => setTextComment(e.target.value)} />
                            <button type='submit' className="border h-8 hover:shadow-amber-500 border-amber-500 px-3 font-medium  text-amber-500 hover:bg-amber-500 hover:text-slate-900  text-base" onClick={handleChangeComment}>Comment</button>
                        </div>
                    </div>
                </div>
                {showComments && comments?.map((c) => {
                    return <Comments key={c.commentId} comment={c} post={post} id={id} />
                })}
            </div>
        </>
    )
}
export default PostCard
