import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContextProvider from '../context/ContextProvider';

function Connection({ user }) {
    const { sendConnectionRequest, profileData, undoConnectionRequest, userInformation, removeConnection } = useContext(ContextProvider);
    useEffect(() => {
        userInformation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {(user?.connections?.includes(profileData?.uid) && profileData?.connections?.includes(user?.uid)) ? <>
                <Link to={`/chat/${user.uid}`} title="Message" className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md">Message</Link>
            </> : user?.connectionRequests?.includes(profileData?.uid) ? (<>
                <button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md" onClick={e => undoConnectionRequest(user)}>Requested</button>
            </>) : (<>
                <button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md" onClick={e => sendConnectionRequest(user)}>Connect</button>
            </>)}
            {(user?.connections?.includes(profileData?.uid) && profileData?.connections?.includes(user?.uid)) ? <>
                <button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md" onClick={e => removeConnection(user)}>Remove</button>
            </> : null}
        </>
    )
}

export default Connection