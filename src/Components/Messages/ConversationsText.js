import React, { useRef, useEffect } from 'react'
import { auth } from '../../Firebase';
import Moment from 'react-moment';
const CryptoJS = require("crypto-js");
const key = process.env.REACT_APP_CRYPTO_KEY
function ConversationsText({ msg }) {
    let bytes = CryptoJS.AES.decrypt(msg.msg, key);
    let decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    // when user enter the msg it scroll the screen to last msg
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg])
    // function to detect is any hyperlink is there in in text message
    function linkIfy(text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g
        return text.replace(urlRegex, function (url) {
            return '<a style="color:#141B2A;text-decoration:underline" title="Link: Click to visit" target="_blank" href="' + url + '">' + url + '</a>';
        });
    }
    return (
        <div className="p-0 h-fit bg-gradient-to-r from-slate-500 to-yellow-100 dark:text-white bg-white" ref={scrollRef}>
            <div className="">
                <div className={`${msg.to === auth?.currentUser?.uid ? 'flex' : 'flex flex-row-reverse'}`}>
                    <div className={`my-1 px-1 py-0.5 ${msg.to === auth?.currentUser?.uid ? 'text-left text-black bg-rose-400 w-auto rounded-r px-2 rounded-bl-3xl' : 'bg-blue-400 rounded-l-lg rounded-br-3xl'}`}>
                        <p className='font-medium font-serif' dangerouslySetInnerHTML={{ __html: linkIfy(decryptedText) }} />
                        {msg.media ? (<img src={msg.media} alt='my-pic' className='' />) : null}
                        <br />
                        <small className='text-xs opacity-50'>
                            {<Moment fromNow>{msg.createdAt.toDate()}</Moment>}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationsText