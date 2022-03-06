import React, {useRef , useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { auth } from '../../Firebase';
import ContextProvider from '../context/ContextProvider'
import Moment from 'react-moment';
function ConversationsText({ msg }) {
    const params = useParams(); 
    const {uid} = params;
    const {darkMode} = useContext(ContextProvider);
    console.warn(uid)
    // when user enter the msg it scorll the screen to last msg
    const scrollRef =useRef();
    useEffect(()=>{
         scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[msg])
    return (
        <div className={`p-0 h-fit ${darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-700 text-white' : "bg-white"}`} ref={scrollRef}>
            <div className="">
                <div className={`${msg.to===auth.currentUser.uid?'flex':'flex flex-row-reverse'}`}>
                    <p className={`${msg.to===auth.currentUser.uid?'text-left text-black bg-yellow-500 w-auto rounded-lg px-2':'text-right bg-blue-400 rounded-lg'}`}>{msg.msg}
                      {msg.media ?(<img src={msg.media} />):null}
                        <br />
                        <small className='text-xs opacity-50'>
                            {<Moment fromNow>
                                {msg.createdAt.toDate()}</Moment>}
                        </small>
                        <hr />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationsText