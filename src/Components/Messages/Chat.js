import React, {useEffect, useState} from 'react'
import SenderProfile from './SenderProfile'
import { useParams } from "react-router-dom";
import {BsUpload} from 'react-icons/bs'
import { doc,  getDoc } from "firebase/firestore";
import { db} from '../../Firebase';
function Chat() {
  const params = useParams();
  const { uid } = params;
  const userid = uid.split(" ").join("") //removing spaces form uid it was most important for geting user profile info
  const [user, setUser] = useState({});
  useEffect(() => {
    // userInformation();
    const docRef = doc(db, "users", userid);
      getDoc(docRef).then((docSnap)=>{
        if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
      
      }).catch((e)=>console.log(e))

  }, [])
  return (
    <>
        <div>
            <SenderProfile />
            <div className='p-5'>
                
            </div>
            <div className='relative bottom-0 flex'>
                <BsUpload className=''/>
                <input type="text" className='bg-gray-500 px-2 py-2 w-3/4' />
                <button className='bg-yellow-300 px-2 py-2 rounded-r'>Send</button>
            </div>
        </div>
    </>
  )
}

export default Chat