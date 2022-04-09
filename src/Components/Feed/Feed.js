import React, {useState , useEffect} from "react";
import LeftAboutCard from './LeftAboutCard'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../Firebase'
import GroupsClub from './GroupsClub'
import NewPost from './NewPost'
import PostCard from './PostCard'
import PeersNews from './PeersNews'
import Opportunities from './Opportunities'
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
function Feed() {
  const [posts , setPosts] = useState([]);
  const [loading, setLoading]= useState(false);
  useEffect(()=>{
    
    const fetchPosts = async () => {
      try {
        // Get reference
        setLoading(true)
        const listingsRef = collection(db, 'posts')

        // Create a query
        const q = query(
          listingsRef,
          
          orderBy('postedAt', 'desc'),
          limit(10)
        )
        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        const posts = []

        querySnap.forEach((doc) => {
          return posts.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        // console.log('posts are', posts);
        setPosts(posts); 
        // setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchPosts()
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  if(loading){
    return <Loader/>
  }
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
          <div className="sm:ml-2">
            <NewPost />
            {posts.map((post)=>{
              return <PostCard key={post.id} post={post.data} /> 
            })}
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
