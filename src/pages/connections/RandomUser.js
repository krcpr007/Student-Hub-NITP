import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../Firebase';
import contextProvider from '../../context/ContextProvider'
import Loader from '../../Components/Loader/Loader';
import ProfileCard from '../Search/ProfileCard';
class RandomUser extends Component {
  static contextType = contextProvider;
  localAuth = JSON.parse(localStorage.getItem('st-hub'));
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true,
    }
  }
  async componentDidMount() {
    const { setProfileData } = this.context;
    const localAuth = JSON.parse(localStorage.getItem('st-hub'));
    try {
      const querySnap = await getDoc(doc(db, 'users', localAuth?.uid));
      if (querySnap.exists) {
        setProfileData(querySnap.data());
      }
      else {
        console.log("Something went wrong to get user profile")
      }
    } catch (error) {
      console.log(error);
    }
    this.findUsers();
  }
  async findUsers() {
    const { userInformation } = this.context;
    userInformation();
    try {
      this.setState({ loading: true })
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef, orderBy('timeStamp', 'desc'),
      limit(10)
      );
      const querySnap = await getDocs(q);
      const user = []
      querySnap.forEach((doc) => {
        if ((doc.data().connections?.includes(this.localAuth?.uid)) && (this.context.profileData.connections?.includes(doc.data()?.uid))) {
          //only connected people can text each other
        } else {
          user.push(doc.data());
        }
        // user.push(doc.data());
      })
      this.setState({ users: user, loading: false })
    } catch (error) {
      console.log(error);
      this.setState({ loading: false })
      toast.error("Something went wrong")
    }
  }
  render() {
    return (
    <>
      <h1 className='text-center font-medium font-serif'>People may you know</h1>
      <div className='grid grid-cols-1 sm:grid-cols-4 mt-5'>
        {this.state.users?.map((user, i) => {
          return this.state.loader ? <Loader /> : <ProfileCard key={i} user={user} />
        })}
      </div>
    </>)
  }
}
export default RandomUser;