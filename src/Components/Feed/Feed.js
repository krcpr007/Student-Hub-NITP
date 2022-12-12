import React, { useState, useEffect, useContext } from "react";
import LeftAboutCard from './LeftAboutCard'
import {
  collection,
  getDocs,
  query,
  // where,
  orderBy,
  // limit,
  // startAfter,
} from 'firebase/firestore'
import { db } from '../../Firebase'
import GroupsClub from './GroupsClub'
import ContextProvider from "../../context/ContextProvider";
import NewPost from './NewPost'
import PostCard from './PostCard'
import PeersNews from './PeersNews'
import Opportunities from './Opportunities'
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
function Feed() {
  const [posts, setPosts] = useState([]);
  const { profileData } = useContext(ContextProvider);
  console.log(profileData)
  const [loading, setLoading] = useState(false);
  //creating state to automatically reloadData whenever publish an new post
  const [getNewPosts, setGetNewPosts] = useState(false)
  //function for fetchPost
  const fetchPosts = async () => {
    try {
      // Get reference
      setLoading(true)
      const listingsRef = collection(db, 'posts')
      // Create a query
      const q = query(
        listingsRef,
        orderBy('postedAt', 'desc'),
        // limit(10)
      )
      // Execute query
      const querySnap = await getDocs(q)
      // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      const post = []
      querySnap.forEach((doc) => {
        // if (profileData?.connections?.includes(doc?.data()?.uid)) {
        post.push({ id: doc?.id, data: doc?.data() })
        // }
      })
      setPosts(post);
      // console.log(typeof (posts))
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error('Could not fetch Posts')
    }
  }
  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewPosts])
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className="dark:bg-slate-800">
        <div className={`md:grid lg:grid grid-cols-5 dark:bg-slate-800 dark:text-white`} >
          <div>
            <div className="hidden lg:inline">
              <LeftAboutCard />
              <GroupsClub />
            </div>
          </div>
          <div className="sm:ml-2 col-span-3">
            <NewPost setGetNewPosts={setGetNewPosts} />
            {posts.length === 0 ? <>
              <Loader />
            </> : posts.map((post) => {
              return <PostCard key={post.id} post={post.data} id={post.id} fetchPosts={fetchPosts} />
            })}
          </div>
          <div className="hidden lg:inline md:mr-10">
            <PeersNews />
            <Opportunities />
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
