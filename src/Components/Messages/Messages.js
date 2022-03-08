import {useEffect, useState } from 'react'
import SenderProfile from './SenderProfile'
import { db , auth} from "../../Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function Messages() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true)
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
      // execute query
      const unsub = onSnapshot(q, (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUsers(users);
        console.table(users)
        setLoading(false)
      });

      return () => unsub();
    }, []);
  if(loading){
    return<h1>Loading...</h1>
  }
  return (
    <div className='md:flex'>
      <div className='lg:w-1/4'>
       {users.map((sender)=>{
         return <SenderProfile key={sender.uid} sender={sender} user1={auth.currentUser.uid} />
        })}
        </div>
        <div className="bg-slate-500 w-full">
          {/* <h1 className='text-center'>Nit Patna</h1> */}
           <img src="Nit_patna.jpeg" className='h-full' alt="" />
        </div>
    </div>
  )
}

export default Messages