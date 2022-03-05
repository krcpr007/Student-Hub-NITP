import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiMessageSquareEdit } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCameraFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { RiInstagramFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { Link } from "react-router-dom";
import avatar from '../assets/img_avatar.png'
import Loader from "../Loader/Loader";
import { collection, doc, onSnapshot, query, updateDoc, where, getDoc } from "firebase/firestore";
import { db, storage, auth } from '../../Firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import ContextProvider from '../context/ContextProvider'
import { async } from "@firebase/util";
function UserProfile() {
  const params = useParams();
  const { uid } = params;
  const userid = uid.split(" ").join("") //removing spaces form uid it was most important for geting user profile info
  const { darkMode, profileData, userInformation } = useContext(ContextProvider);
  const [profileImg, setProfileImg] = useState();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = useState(true);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    userInformation();
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }


  }, [profileImg])
  // const deleteProfileImg = async () => {
  //   try {
  //     const yes = window.confirm("Delete Profile Picture ?")
  //     if (yes) {
  //       await deleteObject(ref(storage, profileData.profileImg));
  //       await updateDoc(doc(db, 'users', auth.currentUser.uid), {
  //         profileImg: '',
  //         profileImgPath: '',
  //       })
  //       setShowModal(false)
  //     } else {
  //       setShowModal(false)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  return (
    <>
      {/* https://www.w3schools.com/howto/img_avatar.png */}
      <div>
        <div className="w-full md:w-3/4 md:px-24 md:p-2 ">
          <div className={`shadow-2xl md:rounded-t-lg ${darkMode ? 'bg-slate-900 text-white' : null}`}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80"
                alt="post-pic"
                className="md:rounded-t-lg w-full md:h-72"
              />
              <img
                src={user.profileImg || avatar}
                alt=""
                onClick={() => setShowModal(true)}
                className="cursor-pointer relative w-1/3 -top-12 md:-top-28 left-5 md:w-1/5 rounded-full border-2 border-yellow-400"
              />
            </div>
            <div className="relative -top-10 md:-top-24 md:left-5">
              <div className='absolute -top-14 left-40 md:left-3/4 '>

                <div className='flex'>
                  <a href={profileData.socialMedia_urls[1]} target='_blank' rel='noreferrer'>
                    <ImLinkedin title={'Linkedin Profile Link'} className={'text-2xl mx-2 text-blue-500'} />
                  </a>
                  <a href={profileData.socialMedia_urls[2]} target='_blank' rel='noreferrer'>
                    <RiInstagramFill title={'Instagram Profile Link'} className={'text-2xl mx-2 text-rose-600'} />
                  </a>
                  <a href={profileData.socialMedia_urls[0]} target='_blank' rel='noreferrer'>
                    <FaGithub title={'Github Account Link'} className={'text-2xl mx-2 text-indigo-500'} />
                  </a>
                  <Link to="/editProfile"><BiMessageSquareEdit title={'Edit Profile Details'} className="relative text-rose-600 text-2xl cursor-pointer" /></Link>
                </div>
              </div>

              {/* <h1 className="text-3xl font-medium">{auth.currentUser.displayName?`${auth.currentUser.displayName}`:`${profileData.name}`}</h1> */}
              <h1 className="text-3xl font-medium">{user.name}</h1>

              <span className="text-sm">{user && user.headline}</span> <br />
              <span className="text-xs">Patna, Bihar,India</span> <Link className="text-sm text-blue-600" to="/contactInfo">Contact info</Link>
            </div>
          </div>
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
                    <h3 className="text-xl font-medium">
                      Profile picture
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-4 flex-auto">
                    <img
                      src={profileData.profileImg || avatar}
                      alt=""
                      className="w-full rounded-full border-2 border-gray-400"
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <AiFillCloseCircle className=""/>
                  </button>
                  {/* <button
                    className="bg-rose-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteProfileImg}
                  >
                    <MdDelete className=""/>
                  </button>
                  <button
                      className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"

                    >
                      <label htmlFor="profileImg">

                        <BsFillCameraFill className="text-lg" />
                      </label>
                      <input type="file" accept="image/*" style={{ display: "none" }} id="profileImg" onChange={e => setProfileImg(e.target.files[0])} />
                    </button> */}
                </div>
                </div>
              </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
          </>
        ) : null}
      </div>
    </>
  );
}

export default UserProfile;
