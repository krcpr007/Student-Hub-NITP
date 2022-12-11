import React, { useContext, useEffect, useState } from 'react'
import ContextProvider from '../../context/ContextProvider';
import Loader from '../Loader/Loader';
import RequestedProfile from './RequestedProfile';

function ConnectionRequests() {
    const { profileData, userInformation, removeConnectionRequest, acceptConnectionRequest } = useContext(ContextProvider);
    const [loader, setLoader] = useState(false);
    const [connectionRequests, setConnectionRequests] = useState([]);
    console.log(connectionRequests)
    useEffect(() => {
        setLoader(true)
        userInformation()
        const request = [];
        profileData?.connectionRequests?.map((it) => request.push(it))
        setConnectionRequests(request);
        setLoader(false)
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
                            return <><RequestedProfile key={uid?.uid} uid={uid} /></>
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConnectionRequests