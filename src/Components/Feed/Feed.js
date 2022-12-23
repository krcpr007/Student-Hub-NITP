import LeftAboutCard from './LeftAboutCard'
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  limit,
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
import { Link } from 'react-router-dom';
class Feed extends Component {
  static contextType = ContextProvider;
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
      noOfPosts: 10,
    }
  }
  async componentDidMount() {
    const { setProfileData } = this.context;
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
        limit(parseInt(this.state.noOfPosts))
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
      this.setState({ loading: false })
      toast.error('Could not fetch Posts')
    }
  }
  async fetchMorePosts() {
    try {
      // Get reference
      // this.setState({ loading: true })
      const listingsRef = collection(db, 'posts')
      // Create a query
      const q = query(
        listingsRef,
        orderBy('postedAt', 'desc'),
        limit(parseInt(this.state.noOfPosts) + 10)
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
      this.setState({ posts: post, loading: false, noOfPosts: parseInt(this.state.noOfPosts) + 10 })
    } catch (error) {
      console.log(error);
      this.setState({ loading: false })
      toast.error('Could not fetch Posts')
    }
  }
  render() {
    if (this.state.loading) {
      return <Loader />
    }
    return (
      <>
        <div>
          <div className={`md:grid lg:grid grid-cols-5 dark:bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 dark:text-white`} >
            <div>
              <div className="hidden lg:inline">
                <LeftAboutCard />
                <GroupsClub />
              </div>
            </div>
            <div className="col-span-3">
              <NewPost fetchPosts={this.fetchPosts} />
              {this.state.posts.length === 0 ? <><h1 className='m-1 text-slate-700 text-xl text-center'><Link to="/connections" className='text-yellow-700 underline'>Connect</Link> with people to view posts</h1></> : null}
              {this.state.posts?.map((post) => {
                return <PostCard key={post.id} post={post.data} id={post.id} fetchPosts={this.fetchPosts} />
              })}
              {this.state.posts.length !== 0 ? <div className='px-2.5'>
                <button className='w-full font-medium font-serif p-1 bg-gradient-to-r from-yellow-500 via-gray-600 to-gray-800 text-yellow-600 rounded border border-yellow-500' onClick={() => this.fetchMorePosts()}>Load More...</button>
              </div> : null}
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