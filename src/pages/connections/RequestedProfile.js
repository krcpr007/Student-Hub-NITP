import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../Firebase';
import Loader from '../../Components/Loader/Loader';
import { MdOutlineCancel, MdOutlineDoneAll } from 'react-icons/md'
import ContextProvider from '../../context/ContextProvider';
function RequestedProfile(uid) {
    const { removeConnectionRequest, acceptConnectionRequest } = useContext(ContextProvider);

    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState();
    const userData = async () => {
        setLoader(true)
        const docRef = doc(db, "users", uid?.uid);
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
        <>
            <div className='flex'>
                <div className='mt-2'>
                    <Link to={`/user/${user?.uid}`}>
                        <img src={user?.profileImg} alt="pic" className='w-16 rounded-full border-2 border-yellow-400' />
                    </Link>
                </div>
                <div className='mx-2.5 my-2.5'>
                    <Link to={`/user/${user?.uid}`} className="flex" >
                        <h1 className='font-medium'>{user?.name ? user?.name : "null"} </h1>
                    </Link>
                    <p className='text-xs'>{user?.headline ? user?.headline.substring(0, 30)+"..." : null}</p>
                </div>
                <div className='m-2'>
                    <button className='text-xl hover:'><MdOutlineDoneAll className='text-yellow-600' onClick={() => acceptConnectionRequest(user)} /></button>
                    {/* <button className='mt-4 mx-1 uppercase py-2 px-4 shadow-2xl text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white rounded-md'>Accept</button> */}
                </div>
                <div className='m-2'>
                    <button className='text-xl hover:bg-yellow-400 rounded-sm' onClick={() => removeConnectionRequest(user)}><MdOutlineCancel className='text-rose-600' /></button>
                    {/* <button className='mt-4 mx-1 uppercase py-2 px-4 shadow-2xl text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white rounded-md'>decline</button> */}
                </div>
            </div>
        </>
    )
}

export default RequestedProfile