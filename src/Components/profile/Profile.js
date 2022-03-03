import React, {useState, useContext, useEffect} from "react";
import {BiMessageSquareEdit} from 'react-icons/bi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillCameraFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Loader from "../Loader/Loader";
import { doc ,updateDoc  } from "firebase/firestore";
import { db, storage } from '../../Firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import  ContextProvider  from '../context/ContextProvider'
function Profile() {
  const auth = getAuth(); 
  const {darkMode ,profileData ,userInformation}= useContext(ContextProvider); 
  const [profileImg ,setProfileImg]=useState();
  const [showModal, setShowModal] = React.useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    userInformation();
    if (profileImg) {
      const uploadImg = async () => {
        setLoader(true)
        const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${profileImg.name}`)
        try {
          
         if(profileData.profileImgPath){
           await deleteObject(ref(storage, profileData.profileImgPath));
         }
        const snap = await uploadBytes(imgRef, profileImg);
        
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        
        await  updateDoc(doc(db, 'users', auth.currentUser.uid),{
          profileImg:url,
          profileImgPath: snap.ref.fullPath,
        })
        setProfileImg('');
        // console.log(snap.ref.fullPath);
        // console.log(url);
      } catch (e) {
        console.log(e.message); 
      }
      setLoader(false); 
      }
      uploadImg();
    }
  }, [profileImg])
  const deleteProfileImg= async()=>{
     try {
       const yes = window.confirm("Delete Profile Picture ?")
       if(yes){
         await deleteObject(ref(storage, profileData.profileImg)); 
         await updateDoc(doc(db ,'users', auth.currentUser.uid),{
          profileImg:'',
          profileImgPath: '',
         })
         setShowModal(false)
       }else{
        setShowModal(false)
       }
     } catch (e) {
       console.log(e)
     }
  }
  return (
    <>
     {/* https://www.w3schools.com/howto/img_avatar.png */}
    <div>
      <div className="w-full md:w-3/4 md:px-24 md:p-2 ">
        <div className="shadow-2xl">
          <div> 
            <img
              src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80"
              alt="post-pic"
              className="md:rounded-t-lg w-full md:h-72"
              />
            <img
              src={profileData.profileImg || 'https://www.w3schools.com/howto/img_avatar.png '}
              alt=""
              onClick={() => setShowModal(true)}
              className="cursor-pointer relative w-1/3 -top-12 md:-top-28 left-5 md:w-1/5 rounded-full border-2 border-gray-400"
              />
          </div>
          <div className="relative -top-10 md:-top-24 md:left-5">
            <Link to="/editProfile" ><BiMessageSquareEdit className="relative -top-14 left-3/4 text-xl cursor-pointer"/></Link>
            <h1 className="text-3xl font-medium">{auth.currentUser.displayName?`${auth.currentUser.displayName}`:`${profileData.name}`}</h1>
            <span className="text-sm">{profileData && profileData.headline}</span> <br />
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
                  src={`${(auth.currentUser && profileData.profileImg) ?profileData.profileImg:'https://www.w3schools.com/howto/img_avatar.png'}`}
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
                  <button
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
                    </button>
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

export default Profile;
