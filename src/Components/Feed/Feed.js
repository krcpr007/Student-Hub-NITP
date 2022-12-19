import LeftAboutCard from './LeftAboutCard'
import {
  collection,
  getDocs,
  query,
  // where,
  orderBy,
  doc,
  getDoc,
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
import React, { Component } from "react";
import Loader from '../Loader/Loader';
class Feed extends Component {
  static contextType = ContextProvider;
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
    }
  }
  async componentDidMount() {
    // console.log("component did mount");
    const { setProfileData } = this.context;
    // userInformation();
    const localAuth = JSON.parse(localStorage.getItem('st-hub'));
    try {
      const querySnap = await getDoc(doc(db, 'users', localAuth ? localAuth.uid : null));
      if (querySnap.exists) {
        setProfileData(querySnap.data());
      }
      else {
        console.log("went wrong to get user profile")
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(this.context.profileData)
    this.fetchPosts();
  }
  fetchPosts = async () => {
    try {
      // Get reference
      this.setState({ loading: true })
      const listingsRef = collection(db, 'posts')
      // Create a query
      const q = query(
        listingsRef,
        orderBy('postedAt', 'desc'),
        // limit(10)
      )
      // Execute query
      const querySnap = await getDocs(q)

      const post = []
      querySnap.forEach((doc) => {
        if (this.context.profileData?.connections?.includes(doc?.data()?.uid)) { //only connected people can see each others posts
          post.push({ id: doc?.id, data: doc?.data() })
        }
        // post.push({ id: doc?.id, data: doc?.data() })
      })
      this.setState({ posts: post, loading: false })
    } catch (error) {
      console.log(error);
      toast.error('Could not fetch Posts')
    }
  }
  render() {
    if (this.state.loading) {
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
            <div className="col-span-3">
              <NewPost fetchPosts={this.fetchPosts} />
              {this.state.posts?.map((post) => {
                return <PostCard key={post.id} post={post.data} id={post.id} fetchPosts={this.fetchPosts} />
              })}

            </div>
            <div className="hidden lg:inline md:mr-5">
              <PeersNews />
              <Opportunities />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Feed;