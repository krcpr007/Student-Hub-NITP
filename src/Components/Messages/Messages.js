import { useEffect, useState, useContext } from 'react'
import SenderProfile from './SenderProfile';
import { db } from "../../Firebase";
import contextProvider from '../context/ContextProvider'
import Loader from '../Loader/Loader'
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function Messages() {
  const { profileData, userInformation } = useContext(contextProvider);
  // console.log("profile", profileData)
  const localAuth = JSON.parse(localStorage.getItem('st-hub'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const connectedUsers = async () => {
    setLoading(true)
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [localAuth?.uid]));
    const querySnap = await getDocs(q);
    const user = []
    querySnap.forEach((doc) => {
      if ((doc.data().connections?.includes(localAuth?.uid)) && (profileData.connections?.includes(doc.data()?.uid))) {
        user.push(doc.data()); //only connected people can text each other
      }
    })
    setUsers(user)
    setLoading(false)
  }
  useEffect(() => {
    userInformation()
    connectedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <Loader />
  }
  return (
    <div className="dark:bg-slate-700 dark:text-white">
      <div className=' content-center md:grid md:grid-cols-6 lg:grid-cols-8 '>
        <div></div>
        <div className='col-span-2 m-2  shadow-lg'>
          <p className={`p-2 font-bold dark:bg-slate-900 dark:text-white`}>Messages</p>
          {users.map((sender) => {
            return <SenderProfile key={sender.uid} sender={sender} user1={localAuth?.uid} />
          })}
        </div>
        <div className={`m-2 ml-0 w-full  sm:invisible md:visible md:col-span-3 lg:col-span-4 shadow-lg  dark:bg-slate-900 dark:text-white`}>
          <div className='grid grid-rows-6 place-items-center'>
            <div className='row-span-3'></div>
            <div className=''>

              <svg aria-label="Direct" className="_ab6-" color="#fff" fill="#fff" height="96" role="img" viewBox="0 0 96 96" width="96">
                <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={` dark:stroke-white stroke-black`}></circle>
                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804" className={`strokeWidth-2  dark:stroke-white stroke-black`}></line>
                <polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" className={` dark:stroke-white stroke-black`}></polygon>
              </svg>
            </div>
            <div className='text-center'>
              <h1 className=' font-extrabold'>Your Messages</h1>
              <p className=' font-bold'>Send private photos and messeges to your connections</p>
            </div>
          </div>
          {/* <img src="Nit_patna.jpeg" className='h-full' alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default Messages