import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai'
function Comments({ comment, post }) {
    // console.log(comment);
    // console.log(post)
    const localAuth = JSON.parse(localStorage.getItem('st-hub'));
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState();
    const userData = async () => {
        setLoader(true)
        const docRef = doc(db, "users", comment?.user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log(docSnap.data());
            setUser(docSnap.data());
            setLoader(false);
        }
    }
    useEffect(() => {
        userData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleDeleteComment = (commentId) => {
        // const yes = window.confirm("Are you sure mf?")
        // if (yes) {
        //     try {
        //         console.log(commentId)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // console.log("Deleted")
    }
    if (loader) return <Loader />
    return (
        <div className='m-1 bg-gray-800 rounded-md'>
            <div className='flex p-2 relative' key={comment.commentId}>
                <div className='m-1'>
                    <Link to={`/user/${comment?.user}`}><img src={user?.profileImg} alt="" className='w-10 rounded-3xl border border-gray-400' loading='lazy' /></Link>
                </div>
                <div className='mx-2'>
                    <Link to={`/user/${comment?.user}`}>
                        <h3>{user?.name}</h3>
                    </Link>
                    <p className='text-sm'>{comment.comment}</p>
                </div>
                {(comment.user === localAuth?.uid || localAuth?.uid === post.uid) ?
                    <div>
                        <button className='bg-amber-600 float-right absolute right-3 top-5' onClick={() => handleDeleteComment(comment.commentId)}><AiFillDelete /></button>
                    </div>
                    : null}
            </div>
            <hr />
        </div>
    )
}

export default Comments