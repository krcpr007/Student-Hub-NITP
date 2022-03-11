import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { db ,auht, auth } from '../../Firebase';
import ProfileCard from './ProfileCard';
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import LeftAboutCard from '../Feed/LeftAboutCard';
import PeersNews from '../Feed/PeersNews';
import GroupsClub from '../Feed/GroupsClub';
import Opportunities from '../Feed/Opportunities';
function Search() {
  let querySearch = new URLSearchParams(useLocation().search).get('name');
  console.log(querySearch);
  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("name", '==', [querySearch]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      })
      console.log(users);
    });
    return () => unsub();
  }, [])

  return (
    <div>
      <div className="">
        <div className="flex">
          <div>
            <div className="hidden md:inline">
              <LeftAboutCard />
              <GroupsClub />
            </div>
          </div>
          <div className="mr-10">
            <img src="CSE_Department.jpg" className='w-full' alt="" />
           <div className='grid sm:grid-cols-3 gap-12'>
             <ProfileCard/>
             <ProfileCard/>
             <ProfileCard/>
             <ProfileCard/>
             <ProfileCard/>
           </div>
          </div>
          <div className="hidden md:inline">
            <PeersNews />
            <Opportunities />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search