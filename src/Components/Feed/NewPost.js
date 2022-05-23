import avatar from '../assets/img_avatar.png';
import { Link } from 'react-router-dom';
import {db, storage} from '../../Firebase';
import {MdDownloading} from 'react-icons/md'
import React, { useContext, useEffect, useState } from 'react'
import { IoMdPhotos } from 'react-icons/io';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { setDoc, doc, getDoc, serverTimestamp, Timestamp , addDoc , collection, updateDoc} from "firebase/firestore";
import { MdVideoLibrary, MdEventAvailable } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai'
import ContextProvider from '../context/ContextProvider';
function NewPost() {
  const localAuth = JSON.parse(localStorage.getItem('st-hub'));
  const uid = localAuth.uid; 
  const { darkMode, userInformation, profileData } = useContext(ContextProvider);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const showAndHideModal = () => {
    setShowModal(!showModal);
    setText('');
  }
  const date = new Date();
  useEffect(() => {
    userInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const CreatePost =async (e) => {
    if (file) {
      const uploadImg = async () => {
        setLoader(true)
        const imgRef = ref(storage, `posts/${new Date().getTime()} - ${file.name}`)
        try {
          
        const snap = await uploadBytes(imgRef, file);
        
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        
        await  addDoc(collection(db, 'posts'),{
          imgPath:url,
          forDeletePath: snap.ref.fullPath,
        })
        setFile('');
      } catch (e) {
        console.log(e.message); 
      }
      setLoader(false); 
      }
      uploadImg();
    }
    e.preventDefault(); 
    if(text.length!==0 || file){
      const imgRef = ref(storage, `posts/${new Date().getTime()} - ${file.name}`)
        try {
          
        const snap = await uploadBytes(imgRef, file);
        
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        
        setFile('');
      await addDoc(collection(db, 'posts'), {
        comments:['', ''],
        text:text, 
        uid:uid, 
        postedAt:date,
        likes:1,
        imgPath:url,
        forDeletePath: snap.ref.fullPath,

      }); 
      showAndHideModal();
    }catch(e){
      console.error('enter data first')
    }
  }
  }
  return (
    <div className={`lg:w-3/4 sm:w-3/4 shadow rounded ${darkMode ? 'bg-slate-900 text-white' : null}`}>
      <div className='flex p-2 m-2'>
        <Link to='/profile'>
          <img src={profileData.profileImg || avatar} alt="" className='w-10 rounded-3xl border-2 border-gray-400' />
        </Link>
        <input type="text" className='px-8 border-2 w-full border-gray-300 rounded-3xl bg-gray-200 text-gray-900' placeholder='Start a conversation' onClick={showAndHideModal} />
      </div>
      <div className=' p-2  '>
        <span className='mx-6 cursor-pointer hover:bg-gray-200 p-1.5' data-modal-toggle="defaultModal" onClick={showAndHideModal}>
          <IoMdPhotos className='inline' color="gold" /> Photos
        </span>
        <span className='mr-6 hover:bg-gray-200 p-1.5 cursor-pointer' data-modal-toggle="defaultModal" onClick={showAndHideModal}>
          <MdVideoLibrary color="gold" className='inline' /> Videos
        </span>
        <span className='mr-6 hover:bg-gray-200 p-1.5 cursor-pointer' data-modal-toggle="defaultModal" onClick={showAndHideModal}>

          <MdEventAvailable color="gold" className='inline' /> Events
        </span>
      </div>
      {showModal ? (<div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative md:w-1/4 my-6 mx-auto max-w-3xl ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-medium">
                New Post
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
              <form action="">
            <div className="relative p-4 flex-auto">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..." value={text} onChange={e => setText(e.target.value)} />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="user_avatar">Upload file</label>
                <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className=" bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                <AiFillCloseCircle className="" />
              </button>
              <button
                className="bg-rose-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit" onClick={CreatePost}
              >
                Post
              </button>
              <button
                className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                {loader?(<MdDownloading className="text-xl text-yellow-400"/>):null}
              </button>
            </div>
              </form>
          </div>
        </div>
      </div>) : null}
    </div>
  )
}
export default NewPost
