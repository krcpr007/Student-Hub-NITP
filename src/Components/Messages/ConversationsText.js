import React, {useRef , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { auth } from '../../Firebase';
import Moment from 'react-moment';
function ConversationsText({ msg }) {
    const params = useParams(); 
    const {uid} = params;
    console.warn(uid)
    // when user enter the msg it scorll the screen to last msg
    const scrollRef =useRef();
    useEffect(()=>{
         scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[msg])
    return (
        <div className='' ref={scrollRef}>
            <div className="">
                <div className='px-0 '>
                    <p className={`m-1 ${msg.to===auth.currentUser.uid?'text-left text-slate-900':'text-right'}`}>{msg.msg}
                      {msg.media ?(<img src={msg.media} />):null}
                        <br />
                        <small className='text-xs'>
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