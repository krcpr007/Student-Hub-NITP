import React, {useRef , useEffect, useContext} from 'react'
import { auth } from '../../Firebase';
import ContextProvider from '../context/ContextProvider'
import Moment from 'react-moment';
function ConversationsText({ msg }) {
    const {darkMode} = useContext(ContextProvider);
    // when user enter the msg it scorll the screen to last msg
    const scrollRef =useRef();
    useEffect(()=>{
         scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[msg])
    return (
        <div className={`p-0 h-fit ${darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-700 text-white' : "bg-white"}`} ref={scrollRef}>
            <div className="">
                <div className={`${msg.to===auth.currentUser.uid?'flex':'flex flex-row-reverse'}`}>
                    <p className={`my-1 px-1 py-1 ${msg.to===auth.currentUser.uid?'text-left text-black bg-yellow-500 w-auto rounded-r px-2 rounded-bl-3xl':'bg-blue-400 rounded-l-lg rounded-br-3xl'}`}>{msg.msg}
                      {msg.media ?(<img src={msg.media} alt='' />):null}
                        <br />
                        <small className='text-xs opacity-50'>
                            {<Moment fromNow>
                                {msg.createdAt.toDate()}</Moment>}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationsText