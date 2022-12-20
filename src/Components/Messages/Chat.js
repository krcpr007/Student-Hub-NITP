import React, { useEffect, useState} from 'react';
import Img from '../../assets/img_avatar.png'
import { Link , useParams} from 'react-router-dom';
import {FcGallery} from 'react-icons/fc'
import {
  doc,
  getDoc, addDoc,
  collection, Timestamp, orderBy, query, onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  ref, getDownloadURL, uploadBytes,
} from 'firebase/storage'
import { db, auth, storage } from '../../Firebase';
import ConversationsText from './ConversationsText';
const CryptoJS = require("crypto-js");
const key = process.env.REACT_APP_CRYPTO_KEY 
function Chat() {
  const user1 = auth?.currentUser?.uid; // getting current user 
  const params = useParams();
  const { uid } = params;
  const user2 = uid // uid we are getting from params
  const [user, setUser] = useState({});
  const [conversation, setConversation] = useState([])
  const [msg, setMsg] = useState('');
  const [media, setMedia] = useState('');
  let encryptedText = CryptoJS.AES.encrypt(msg, key).toString();
  useEffect(() => {
    const docRef = doc(db, "users", uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((e) => console.log(e))
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}` // creating msg unique id
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc')) // for getting msgs in descending order
    onSnapshot(q, querySnapshot => {
      let convo = [];
      querySnapshot.forEach((doc) => {
        convo.push(doc.data());
      })
      setConversation(convo)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}` // creating msg unique id
    // if user is selected the url 
    let url;
    if (media) {
      const mediaRef = ref(storage, `ChatMedia/${new Date().getTime()} - ${media.name}`);
      const snap = await uploadBytes(mediaRef, media);
      const MediaUrl = await getDownloadURL(ref(storage, snap.ref.fullPath)) // here i was doing the one silly mistake promises was not resolved (await was missing )
      url = MediaUrl;
    }
    if (msg.trim().length !== 0 || media) {

      await addDoc(collection(db, 'messages', id, 'chat'), {
        msg:encryptedText,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || ''
      });
      await setDoc(doc(db, 'lastMsg', id), { // set last msg to users so that we can get one step above when profile will show we can show the last msg
        msg:encryptedText,        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
        unread: true,

      })

    } else {
      alert("Enter msg first")
    }
    setMsg('');
    setMedia('')
  };
  return (
    <>
      <div className=''>
        <div className="dark:bg-gradient-to-r dark:from-slate-300 dark:via-slate-700 dark:to-slate-900 ">
          <Link to={`/user/${user.uid}`} className='flex'>
            <div className='mt-2'>
              <img src={user.profileImg || Img} alt="" className='w-12 rounded-full border border-yellow-600' />
            </div>
            <div className='mx-2.5 my-2.5'>
              <h1 className='font-medium'>{user.name ? user.name : "Lorem ipsum"} </h1>
              <p className='text-xs'>{user.headline ? user.headline : null}</p>
            </div>
          </Link>
        </div>
        <div className='bg-black'>
          <div>
            {conversation.length && conversation.map((msg, i) => <ConversationsText key={i} msg={msg} />)}
          </div>
        </div>

        <div className='relative bottom-0'>
          <form className='flex bg-slate-500 rounded-r'>
            <label htmlFor="file" className=' border-r border-gray-900 cursor-pointer'>
              <FcGallery className='text-2xl mx-3 my-2 ' />
            </label>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => setMedia(e.target.files[0])} name='file' id='file' />
            <input type="text" value={msg} onChange={e => setMsg(e.target.value)} className='bg-slate-500 px-2 py-2 w-full' placeholder='Message...' />
            <button type="submit" onClick={handleSubmit} className={`bg-yellow-300 px-2 py-2 rounded-r w-48 hover:bg-yellow-500`}>{media?"Send File":'Send'}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat