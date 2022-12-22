import { collection, doc, getDoc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
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
      noOfUsers: 4,
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
      // reference to the db collection
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef,
        orderBy('timeStamp', 'desc'),
        limit(this.state.noOfUsers)
      );
      onSnapshot(q, (snap) => {
        const user = [];
        snap.forEach((doc) => { // here finding all the users 
          if (!((doc.data().connections?.includes(this.localAuth?.uid)) && (this.context.profileData?.connections?.includes(doc.data()?.uid)))) { //conditions if they are already connected then it should not be show here 
            if (doc.data()?.uid !== this.context.profileData?.uid) { //removing ourself 
              user.push(doc.data());
            }
          }
          // user.push(doc.data());
        })
        this.setState({
          users: user, loading: false,
        })
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false })
      toast.error("Something went wrong")
    }
  }
  findMoreUsers() {
    try {
      // this.setState({ loading: true })
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef, orderBy('timeStamp', 'desc'),
        limit(parseInt(this.state.noOfUsers) + 5)
      );
      onSnapshot(q, (snap) => {
        const user = [];
        snap.forEach((doc) => { // here finding all the users 
          if (!((doc.data().connections?.includes(this.localAuth?.uid)) && (this.context.profileData?.connections?.includes(doc.data()?.uid)))) { //conditions if they are already connected then it should not be show here 
            if (doc.data()?.uid !== this.context.profileData?.uid) { //removing ourself 
              user.push(doc.data());
            }
          }
        })
        this.setState({
          users: user, loading: false,
          noOfUsers: parseInt(this.state.noOfUsers) + 5,
        })
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false })
      toast.error("Something went wrong")
    }
  }
  render() {
    return (
      <>
        <div>
          <h1 className='text-center font-medium font-serif'>People may you know</h1>
          <div className='grid grid-cols-1 sm:grid-cols-4 mt-5'>
            {this.state.users?.map((user, i) => {
              return this.state.loader ? <Loader /> : <ProfileCard key={i} user={user} />
            })}
          </div>
          <div className='p-1'>
            <button onClick={() => this.findMoreUsers()} className="font-medium font-serif p-1 dark:bg-gradient-to-r from-yellow-500 via-gray-600 to-gray-800 text-white border border-yellow-500">Load More</button>
          </div>
        </div>
      </>)
  }
}
export default RandomUser;