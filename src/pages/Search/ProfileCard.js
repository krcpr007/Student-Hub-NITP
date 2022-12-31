import React, { useContext } from 'react'
import Img from '../../assets/img_avatar.png'
import { Link } from 'react-router-dom'
import mainBuilding from '../../assets/mainBuilding.jpeg'
import ContextProvider from '../../context/ContextProvider';
function ProfileCard({ user }) {
    const { sendConnectionRequest, profileData, undoConnectionRequest } = useContext(ContextProvider);
    return (
        <div className='mx-5'>
            <div className='card rounded-lg hover:shadow-xl w-full'>
                <div>
                    <img src={mainBuilding} alt="" className='rounded-t' />
                    <Link to={`/user/${user.uid}`}>
                        <section className="hero container max-w-screen-lg mx-auto flex justify-center">
                            <img src={`${user.profileImg}` || Img} alt="profile" className='rounded-full w-1/3 relative bottom-10' />
                        </section>
                    </Link>
                </div>
                <div className='text-center relative bottom-8'>
                    <h1>{user.name}</h1>
                    <p className='opacity-75 text-sm'>{user.headline ? `${user.headline?.substring(0, 20)}...` : "---"}</p>
                    {(user?.connections?.includes(profileData?.uid) && profileData?.connections?.includes(user?.uid)) ? <>
                        <Link to={`/chat/${user.uid}`} title="Message"><button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md">Message</button></Link>
                    </> : user?.connectionRequests?.includes(profileData?.uid) ? (<>
                        <button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md" onClick={e => undoConnectionRequest(user)}>Requested</button>
                    </>) : (<>
                        <button className="text-md shadow-2xl mx-2 mt-2 text-yellow-400 outline-2 outline-yellow-400 hover:bg-yellow-400 border border-yellow-300 hover:text-white px-3 py-1 rounded-md" onClick={e => sendConnectionRequest(user)}>Connect</button>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard