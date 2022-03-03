import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LeftAboutCard from './LeftAboutCard'
import GroupsClub from './GroupsClub'
import NewPost from './NewPost'
import PostCard from './PostCard'
import PeersNews from './PeersNews'
import Opportunities from './Opportunities'
import {getAuth} from 'firebase/auth'
function Feed() {
  const navigate= useNavigate();
  const auth = getAuth(); 
  useEffect(()=>{
     if(!auth.currentUser){
       navigate('/login')
     }
  },[])
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
          <div className="">
            <NewPost />
            <PostCard />
          </div>
          <div className="hidden md:inline md:mr-10">
            <PeersNews />
            <Opportunities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
