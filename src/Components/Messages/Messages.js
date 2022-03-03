import React,{useEffect, useState } from 'react'
import SenderProfile from './SenderProfile'
import {getAuth} from 'firebase/auth'
import { db, storage } from "../../Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function Messages() {
  const auth = getAuth();
  const [users, setUsers] = useState([]);
    useEffect(() => {
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
      });
      return () => unsub();
    }, []);
  console.log(users);
  return (
    <div>
       {users.map((sender)=>{
         return <SenderProfile key= {sender.uid} profileImg={sender.profileImg} />
       })}
    </div>
  )
}

export default Messages