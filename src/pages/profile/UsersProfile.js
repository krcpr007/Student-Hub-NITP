import React, { useState, useEffect, useContext } from "react";
import nitlogo from '../../assets/nitlogo.png'
import { useParams } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdPlace, MdEmail, MdContactPhone, MdHome } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { RiInstagramFill } from 'react-icons/ri'
import avatar from '../../assets/img_avatar.png'
import Loader from "../../Components/Loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../../Firebase';
import UserPosts from "./UserPosts";
import mainBuilding from '../../assets/mainBuilding.jpeg'
import Connection from "./Connection";
import ContextProvider from "../../context/ContextProvider";
function UserProfile() {
  const params = useParams();
  const { uid } = params;
  const localAuth = JSON.parse(localStorage.getItem('st-hub'));
  const { profileData, userInformation } = useContext(ContextProvider);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    userInformation();
    setLoader(true)
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", '==', uid));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUser(doc.data()); //only one doc we will get
      })
      setLoader(false);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <>
      <div>
        <div className="w-full md:w-3/4 md:px-24 md:p-2 ">
          <div className={`shadow-2xl md:rounded-t-lg dark:bg-slate-900 dark:text-white`}>
            <div>
              <img src={mainBuilding} alt="post-pic" className="md:rounded-t-lg w-full md:h-80" />
              <img
                src={user.profileImg || avatar}
                alt=""
                onClick={() => setShowModal(true)}
                className="cursor-pointer relative w-1/3 -top-12 md:-top-28 left-5 md:w-1/5 rounded-full border-2 border-yellow-400"
              />
            </div>
            <div className="relative -top-10 md:-top-24 px-5">
              <h1 className="text-3xl font-medium">{user.name}</h1>

              <span className="text-sm">{user.headline || "---"}</span> <br />
              {user.contactInfo?.home?.length !== 0 ? <>
                <MdPlace title="Live in" className="inline" />
                <span className="text-xs">{user.contactInfo?.home}</span></> : null}
              {((user?.connections?.includes(localAuth?.uid)) && (profileData.connections?.includes(user?.uid))) ? (<><span className="text-sm text-blue-600 cursor-pointer" onClick={e => setShowContactModal(true)}> Contact info</span></>) : null}
              <Connection user={user} />
            </div>
          </div>
          <UserPosts uid={user.uid} />
          {/* {((user?.connections?.includes(localAuth?.uid)) && (profileData.connections?.includes(user?.uid))) ? (<>
          </>) : null} */} {/* Now, if users are not even connected then also we can see their post only in their profile section not in feed */}
        </div>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative md:w-1/4 my-6 mx-auto max-w-3xl ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-xl font-medium">Profile picture</h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-4 flex-auto">
                    <img
                      src={user.profileImg || avatar}
                      alt=""
                      className="w-full rounded-full border-2 border-gray-400"
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className=" bg-rose-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      <AiFillCloseCircle className="" />
                    </button>

                  </div>
                </div>
              </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
          </>
        ) : null}
        {showContactModal ? (<>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative md:w-1/4 my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <img src={nitlogo} className="mx-5" alt="logo" />
                  <h3 className="text-xl font-medium my-2">Contact Info</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <div className="flex my-2">
                    <MdEmail className="text-2xl text-yellow-500" />
                    <a href={`mailto:${user.contactInfo?.email}`} className="mx-2">{user.contactInfo?.email}</a>
                  </div>
                  <div className="flex my-2">
                    <MdContactPhone className="text-2xl text-yellow-500" />
                    <a title="Tap to call" href={`tel:${user.contactInfo?.phoneNo}`} className="mx-2">{user.contactInfo?.phoneNo}</a>
                  </div>
                  <div className="flex my-2">
                    <MdHome className="text-2xl text-yellow-500" />
                    <p className="mx-2">{user.contactInfo?.home}</p>
                  </div>
                  <div className='relative right-0 top-0'>
                    <div className='flex justify-center'>
                      <a href={user?.socialMedia_urls?.[1]} target='_blank' rel='noreferrer'>
                        <ImLinkedin title={'Linkedin Profile Link'} className={'text-2xl mx-2 text-blue-500'} />
                      </a>
                      <a href={user?.socialMedia_urls?.[2]} target='_blank' rel='noreferrer'>
                        <RiInstagramFill title={'Instagram Profile Link'} className={'text-2xl mx-2 text-rose-600'} />
                      </a>
                      <a href={user?.socialMedia_urls?.[0]} target='_blank' rel='noreferrer'>
                        <FaGithub title={'Github Account Link'} className={'text-2xl mx-2 text-indigo-500'} />
                      </a>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowContactModal(false)}
                  >
                    <AiFillCloseCircle className="" />
                  </button>

                </div>
              </div>
            </div>
          </div>
        </>) : null}
      </div>
    </>
  );
}

export default UserProfile;
