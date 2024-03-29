import React, { useState, useContext, useEffect } from "react";
import mainBuilding from '../../assets/mainBuilding.jpeg'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillCameraFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { RiInstagramFill } from 'react-icons/ri'
import { MdDelete, MdEmail, MdContactPhone, MdHome, MdPlace } from 'react-icons/md'
import { Link } from "react-router-dom";
import avatar from '../../assets/img_avatar.png'
import Loader from "../../Components/Loader/Loader";
import { doc, updateDoc, } from "firebase/firestore";
import { db, storage } from '../../Firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import ContextProvider from '../../context/ContextProvider'
import UserPosts from "./UserPosts";
// import ConnectionRequests from "../connections/ConnectionRequests";
function Profile() {
  const { profileData, userInformation } = useContext(ContextProvider);
  const [profileImg, setProfileImg] = useState();
  const [showModal, setShowModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    userInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (profileImg) {
      const uploadImg = async () => {
        setLoader(true)
        const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${profileImg.name}`)
        try {

          if (profileData.profileImgPath) {
            await deleteObject(ref(storage, profileData.profileImgPath));
          }
          const snap = await uploadBytes(imgRef, profileImg);

          const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

          await updateDoc(doc(db, 'users', profileData?.uid), {
            profileImg: url,
            profileImgPath: snap.ref.fullPath,
          })
          setProfileImg('');
        } catch (e) {
          console.log(e.message);
        }
        setLoader(false);
      }
      uploadImg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImg])
  const deleteProfileImg = async () => {
    try {
      const yes = window.confirm("Delete Profile Picture ?")
      if (yes) {
        await deleteObject(ref(storage, profileData.profileImg));
        await updateDoc(doc(db, 'users', profileData?.uid), {
          profileImg: '',
          profileImgPath: '',
        })
        setShowModal(false)
      } else {
        setShowModal(false)
      }
    } catch (e) {
      console.log(e)
    }
  }
  if (loader) {
    return <Loader />
  }
  return (
    <>
      <div>
        <div className="md:w-3/4 md:px-0 lg:px-24 md:py-2">
          <div className="flex">
            <div className="shadow-lg md:rounded-t-lg dark:bg-slate-900 dark:text-white w-full">
              <div>
                <img src={mainBuilding} alt="post-pic" className="md:rounded-t-lg w-full md:h-72" loading="lazy" />
                <img src={profileData.profileImg || avatar} alt="" onClick={() => setShowModal(true)} className="cursor-pointer relative w-1/3 -top-12 sm:-top-20 md:-top-20 lg:-top-28 left-5 md:w-1/5 rounded-full border-2 border-yellow-400" />
              </div>
              <div className="relative -top-10 md:-top-24 px-2.5">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-medium">{profileData?.name}</h1> {(profileData.contactInfo?.home?.length <= 2 || profileData.bio?.length <= 2) ? <><span className="animate-pulse text-rose-600 text-sm">Please filled the <Link className="text-blue-500 hover:underline" to="/editProfile">account details</Link> </span></> : null}
                </div>
                <span className="text-sm">{profileData.headline || "---"}</span> <br />
                {profileData.contactInfo?.home ? <><span className="text-xs"> <MdPlace className="inline" /> {profileData.contactInfo?.home}</span> <span className="text-sm text-blue-600 cursor-pointer" onClick={e => setShowContactModal(true)}  >Contact info</span></> : null}
              </div>
            </div>
            <div>
              {/*  The idea is to display connections request in profile page as well */}
              {/* <ConnectionRequests /> */}
            </div>
          </div>
          <UserPosts uid={profileData?.uid} />
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative md:w-1/4 my-6 mx-auto max-w-3xl ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <div>
                      <h3 className="text-xl font-medium">Profile picture</h3>
                      <p className="text-xs font-medium">Upload 1x1 Ratio image for better UI experience</p>
                    </div>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-4 flex-auto">
                    <img src={profileData.profileImg || avatar} alt="" className="w-full rounded-full border-2 border-gray-400" />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button className=" bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                      <AiFillCloseCircle className="" />
                    </button>
                    <button className="bg-rose-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={deleteProfileImg}>
                      <MdDelete className="" />
                    </button>
                    <button className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      <label htmlFor="profileImg">
                        <BsFillCameraFill className="text-lg" />
                      </label>
                      <input type="file" accept="image/*" style={{ display: "none" }} id="profileImg" onChange={e => setProfileImg(e.target.files[0])} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {showContactModal ? (<>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative md:w-1/4 my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <img src="nitlogo.png" className="mx-5" alt="" />
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
                    <a href={`mailto:${profileData?.contactInfo?.email}`} className="mx-2">{profileData?.contactInfo?.email}</a>
                  </div>
                  <div className="flex my-2">
                    <MdContactPhone className="text-2xl text-yellow-500" />
                    <a title="Tap to call" href={`tel:${profileData?.contactInfo?.phoneNo}`} className="mx-2">{profileData?.contactInfo?.phoneNo}</a>
                  </div>
                  <div className="flex my-2">
                    <MdHome className="text-2xl text-yellow-500" />
                    <p className="mx-2">{profileData.contactInfo?.home}</p>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <a href={profileData?.socialMedia_urls?.[2]} target='_blank' rel='noreferrer'>
                    <ImLinkedin title={'Linkedin Profile Link'} className={'text-2xl mx-2 text-blue-500'} />
                  </a>
                  <a href={profileData?.socialMedia_urls?.[0]} target='_blank' rel='noreferrer'>
                    <RiInstagramFill title={'Instagram Profile Link'} className={'text-2xl mx-2 text-rose-600'} />
                  </a>
                  <a href={profileData?.socialMedia_urls?.[1]} target='_blank' rel='noreferrer'>
                    <FaGithub title={'Github Account Link'} className={'text-2xl mx-2 text-indigo-500'} />
                  </a>
                  <Link to="/editProfile"><BiMessageSquareEdit title={'Edit Profile Details'} className="relative text-rose-600 text-2xl cursor-pointer" /></Link>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button className=" bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowContactModal(false)}>
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

export default Profile;
