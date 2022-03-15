import React, { useEffect ,useState , useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { db, auth } from '../../Firebase';
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
import  ContextProvider  from '../context/ContextProvider';
function Search() {
  const {darkMode} = useContext(ContextProvider)
  let querySearch = new URLSearchParams(useLocation().search).get('name');
  console.log(querySearch);
  const [users, setUsers]= useState([])
  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", 'not-in', [auth.currentUser.uid]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => { // here finding all the users 
        users.push(doc.data()); 
      })
     const filterData= users.filter((value)=>{ // and here find users by the search term which is querySearch
        return value.name.toLowerCase().includes(querySearch.toLowerCase()) || value.headline.toLowerCase().includes(querySearch.toLowerCase()) || value.CurrentPosition.toLowerCase().includes(querySearch.toLowerCase()) // logic to search  
        // search in these fields name , headline, adress , mob,
        // || value.contactInfo.home.toLowerCase().includes(querySearch.toLowerCase())
        // || value.contactInfo.phone.toLowerCase().includes(querySearch.toLowerCase())
      })
     setUsers(filterData);
    });
    return () => unsub();
  }, [querySearch])
  return (
    <div>
      <div className={`${darkMode?'bg-slate-900 text-white':null}`}>
        <div className="flex">
          <div>
            <div className="hidden md:inline">
              <LeftAboutCard />
              <GroupsClub />
            </div>
          </div>
          <div className="mr-10">
          <img src="nithindi.png" className='ml-5 sm:ml-0 bg-black h-10' alt="Nit-hindi" />
            <img src="CSE_Department.jpg" className='ml-5 sm:ml-0' alt="" />
           <div className='grid sm:grid-cols-3 gap-12 mt-5 ml-12 sm:ml-0'>
             {users.map((user , i)=>{
               return <ProfileCard key={i} user={user}/>
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