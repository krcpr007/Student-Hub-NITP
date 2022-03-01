import React, {useState, useContext, useEffect} from "react";
import {BiMessageSquareEdit} from 'react-icons/bi'
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import  ContextProvider  from '../context/ContextProvider'
import {db} from '../../Firebase'
function Profile() {
  const auth = getAuth(); 
  const {darkMode}= useContext(ContextProvider); 
  console.log(darkMode);
  const [profileData ,SetProfileData]=useState({});
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        console.log(docSnap.data());
        SetProfileData(docSnap.data());
      }
    });
  }, [])
  
  return (
    <>
     
    <div>
      <div className="w-full md:w-3/4 md:px-24 md:p-2 ">
        <div className="shadow-2xl">
          <div> 
            <img
              src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80"
              alt="post-pic"
              className="rounded-t-lg w-full md:h-72"
              />
            <img
              src={`${auth.currentUser?auth.currentUser.photoURL:'https://avatars.githubusercontent.com/u/80947662?v=4'}`}
              alt=""
              onClick={() => setShowModal(true)}
              className="cursor-pointer relative w-1/3 -top-12 md:-top-28 left-5 md:w-1/5 rounded-full border-2 border-gray-400"
              />
          </div>
          <div className="relative -top-10 md:-top-24 md:left-5">
            <Link to="/editProfile" ><BiMessageSquareEdit className="relative -top-14 left-3/4 text-xl cursor-pointer"/></Link>
            <h1 className="text-3xl font-medium">{auth.currentUser?`${auth.currentUser.displayName}`:'</Rajan kumar>'}</h1>
            <span className="text-sm">{profileData.headline}</span> <br />
            <span className="text-xs">Patna, Bihar,India</span> <Link className="text-sm text-blue-600" to="/contactInfo">Contact info</Link>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
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
                <div className="relative p-6 flex-auto">
                <img
                  src={`${auth.currentUser?auth.currentUser.photoURL:'https://avatars.githubusercontent.com/u/80947662?v=4'}`}
                  alt=""
                  className="cursor-pointer w-full rounded-full border-2 border-gray-400"
                />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
 </>
  );
}

export default Profile;
