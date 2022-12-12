import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { db, } from '../../Firebase';
import ProfileCard from './ProfileCard';
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Loader from '../../Components/Loader/Loader';
import LeftAboutCard from '../../Components/Feed/LeftAboutCard';
import PeersNews from '../../Components/Feed/PeersNews';
import GroupsClub from '../../Components/Feed/GroupsClub';
import Opportunities from '../../Components/Feed/Opportunities';
function Search() {
  const [loader, setLoader] = useState(false); 
  const localAuth = JSON.parse(localStorage.getItem('st-hub'));// getting auth from local-storage
  let querySearch = new URLSearchParams(useLocation().search).get('name');
  const [users, setUsers] = useState([])
  useEffect(() => {
    setLoader(true)
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", 'not-in', [localAuth?.uid]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => { // here finding all the users 
        users.push(doc.data());
      })
      const filterData = users.filter((value) => { // and here find users by the search term which is querySearch
        //logic to search user the inside details of users 
        // search via name ,headline and addresses also can be done 
        return (value.name.toLowerCase().includes(querySearch.toLowerCase()) || value.headline.toLowerCase().includes(querySearch.toLowerCase()) || value.contactInfo.home.toLowerCase().includes(querySearch.toLowerCase()))
      })
      setLoader(false);
      setUsers(filterData);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className="dark:bg-slate-900 dark:text-white">
        <div className="flex">
          <div className='hidden md:inline w-1/3'>
            <div className="hidden md:inline">
              <LeftAboutCard />
              <GroupsClub />
            </div>
          </div>
          <div className="w-full">
            <img src="homebg-2.jpg" className='w-full mt-2 rounded-t' alt="" />
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-20 mt-5'>
              {users.map((user, i) => {
                return loader?<Loader/>: <ProfileCard key={i} user={user} />
              })}
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