import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaImage} from 'react-icons/fa'
import Img from '../../assets/img_avatar.png';
import { db } from '../../Firebase';
import { onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import {toast} from "react-toastify";
const CryptoJS = require("crypto-js");
const key = process.env.REACT_APP_CRYPTO_KEY 
function SenderProfile({ sender, user1 }) {
    const user2 = sender?.uid;
    const [lastMsgData, setLastMsgData] = useState({});
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}` // creating msg unique id
    let bytes  = CryptoJS.AES.decrypt(lastMsgData?.msg?lastMsgData.msg:'', key);
    let decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    useEffect(() => {
        let unsab = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
            // onSnapshot re-fetch data automatically when data get changed
            setLastMsgData(doc.data());
        })
        return () => unsab();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(()=>{
        if(lastMsgData?.unread && lastMsgData.from !== user1 ){
            toast(`📩 Message received`,{
                autoClose:1000,
            })
            Notification.requestPermission().then(prem=>{
                if(prem==="granted"){
                    new Notification(`${sender?.name}`,{
                        icon:"favicon.ico",
                        body:decryptedText?.substring(0,25)+"..."
                    })
                }
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lastMsgData?.msg])
    // function for when user read the msg so that badge will Disappear
    const msgRead = async () => {
        const docSnap = await getDoc(doc(db, 'lastMsg', id));
        //   if user1 who send msg and also read the msg so badge will not work perfectly 
        if (docSnap.data()?.from !== user1) {
            await updateDoc(doc(db, 'lastMsg', id), {
                unread: false
            })
        } else {
            console.log('can not update');
        }
    }
    return (
        <div className="dark:bg-slate-900 dark:text-white">
            <div className='flex p-3'>
                <div className='mt-2'>
                    <Link to={`/user/${sender.uid}`}>
                        <img src={sender.profileImg || Img} alt="" className='w-16 rounded-full border-2 border-yellow-400' />
                    </Link>
                </div>
                <div className='mx-2.5 my-2.5'>
                    <Link to={`/chat/${sender.uid}`} className="flex" onClick={msgRead}>
                        <h1 className='font-medium'>{sender?.name} </h1>
                        {lastMsgData?.from !== user1 && lastMsgData?.unread && (<span className="animate-pulse bg-gray-100 text-gray-800 text-xs font-extralight ml-2 px-1.5 rounded-full pt-1 dark:bg-gray-700 dark:text-gray-300">New</span>)}
                    </Link>

                    <p className='text-xs'>{sender.headline ? sender.headline.substring(0,30) : null}</p>
                    {lastMsgData && (
                        <small>
                            <span>{lastMsgData.from === user1 ? 'Me: ' : null}</span>
                            {decryptedText?.substring(0,15)+"..."} {lastMsgData.media?(<FaImage className='inline text-yellow-400'/>):null}
                        </small>
                    )}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default SenderProfile