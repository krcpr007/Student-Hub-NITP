import { Component } from 'react'
import SenderProfile from './SenderProfile';
import { db } from "../../Firebase";
import contextProvider from '../../context/ContextProvider'
import Loader from '../Loader/Loader'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
class Messages extends Component {
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
    this.connectedUsers();
  }
  async connectedUsers() {
    try {
      this.setState({ loading: true })
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef, where("uid", "not-in", [this.localAuth?.uid]));
      const querySnap = await getDocs(q);
      const user = []
      querySnap.forEach((doc) => {
        if ((doc.data().connections?.includes(this.localAuth?.uid)) && (this.context.profileData.connections?.includes(doc.data()?.uid))) {
          user.push(doc.data()); //only connected people can text each other
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
    if (this.state.loading) {
      return <Loader />
    }
    return (
      <div className="dark:bg-slate-700 dark:text-white">
        <div className='md:flex px-1 md:p-5 md:h-[40rem]'>
          <div className='my-1 md:w-1/2 shadow-lg sm:overflow-y-scroll snap-y'>
            <p className="p-2 font-bold dark:bg-slate-900 dark:text-white">Messages</p>
            {this.state.users?.map((sender) => {
              return <SenderProfile key={sender.uid} sender={sender} user1={this.localAuth?.uid} />
            })}
          </div>
          <div className="hidden sm:block m-2 ml-0 w-full shadow-lg  dark:text-white bg-gradient-to-r from-yellow-200 to-yellow-500">
            <div className=''>
              {this.state.users.length === 0 ? <><h1 className='m-1 text-gray-500 text-xl text-center font-serif'><Link to="/connections" className='text--600 underline'>Connect</Link> with people to send messages</h1></> : null}
              <div className='flex h-screen justify-center items-center'>
                <div className='text-center'>
                  <h1 className='font-extrabold'>Your Messages</h1>
                  <p className=' font-medium text-gray-700 font-serif'>Send end to end encrypt private photos and messages to your connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Messages;