import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader';
import RequestedProfile from './RequestedProfile';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../Firebase';
import { v4 } from 'uuid';
function ConnectionRequests() {
    const [loader, setLoader] = useState(false);
    const [connectionRequests, setConnectionRequests] = useState([]);
    useEffect(() => {
        setLoader(true)
        const localAuth = JSON.parse(localStorage.getItem('st-hub'));
        const usersRef = collection(db, "users");
        // create query object
        const q = query(usersRef, where("uid", '==', localAuth?.uid));
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setConnectionRequests(doc.data()?.connectionRequests); //only one doc we will get
            })
            setLoader(false);
        });
        return () => unsub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (loader) return <Loader />
    return (
        <>
            <div>
                <div className=''>
                    <h1 className='text-center text-xl font-medium'>Connection Requests {connectionRequests.length}</h1>
                </div>
                <div>
                    <div className='p-3 sm:overflow-y-scroll sm:h-1/2'>
                        {connectionRequests.length === 0 ? (<>
                            <h1 className='text-center'>No Connection Request</h1>
                        </>) : connectionRequests?.map((uid) => {
                            return <><RequestedProfile key={v4()} uid={uid} /></>
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConnectionRequests