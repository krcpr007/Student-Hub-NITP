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

    if (loader) return <Loader />
    return (
        <div className='m-1 bg-gray-800'>
            <div className='flex p-2' key={comment.commentId}>
                <img src={user?.profileImg} className="w-10 rounded-3xl" alt="" loading='lazy' />
                <div className='mx-2'>
                    <h3>{comment.userName}</h3>
                    <p className='text-sm'>{comment.comment}</p>
                </div>
                {(comment.user === localAuth?.uid || comment.user === post.uid) ?
                    <div>
                        <button className='bg-amber-600 float-right'><AiFillDelete /></button>
                    </div>
                    : null}
            </div>
            <hr />
        </div>
    )
}

export default Comments