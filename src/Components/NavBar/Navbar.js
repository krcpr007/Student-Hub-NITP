import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {FaUserPlus} from 'react-icons/fa'
import {IoMdLogIn} from 'react-icons/io'
import {BiNetworkChart} from 'react-icons/bi'
import {FaMedal} from 'react-icons/fa';
import { getAuth,signOut } from 'firebase/auth';
import ContextProvider from "../context/ContextProvider";
function Navbar() {
  const auth = getAuth(); 
  console.log(auth);
  const {darkMode } = useContext(ContextProvider);
  const handleLogout=()=>{
    if(auth.currentUser){
      signOut(auth)
      .then(()=>{
        alert("logout")
      })
      .catch((err)=>{console.log(err)})
    }else{
      alert("already logout")
    }
  }
    return (
 <>
    <nav className={`nav flex flex-wrap items-center justify-between px-4 shadow-inner ${darkMode?'bg-slate-900 text-white':"bg-white"}`}>
      <div className="flex flex-no-shrink items-center lg:ml-24 sm:ml-10 py-3 text-grey-darkest">
        <h1 className="leading-none text-2xl font-medium text-grey-darkest">
          <Link className="no-underline text-grey-darkest hover:text-black" to="/">
          <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
          </Link>
        </h1>
      </div>
      <input className="menu-btn hidden" type="checkbox" id="menu-btn"/>
      <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
        <span className="navicon bg-grey-darkest flex items-center relative"></span>
      </label>
      <ul className='menu'>
      <input className="px-10 py-1  rounded-lg border-2 border-yellow-200 md:w-auto " placeholder="Search" type="text"/>
      </ul>
       <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
      
        {auth.currentUser?(<>
          <li className="border-t md:border-none">
          <Link to="/login" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"> <ImHome size="30" color='gold' className='inline lg:block mx-2'/><span className='text-sm'>My Feed</span></Link>
        </li>
        
        <li className="border-t md:border-none">
          <Link to="/signup" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><FaMedal size="30" color='gold'className='inline lg:block mx-2 lg:mx-6'/> <span className='text-sm'>Oppernuites</span> </Link>
        </li>
        
        <li className="border-t md:border-none">
          <Link to="/login" onClick={handleLogout} className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><BiNetworkChart size="30"  color='gold' className='inline lg:block mx-2 lg:mx-5'/><span className='text-sm'>Logout</span></Link>
        </li>
        <li className="border-t md:border-none">
          <Link to="/profile" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">
          <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="" className='w-7 rounded-full border-2 border-gray-400 inline lg:block' />
            <span className='text-sm mx-2 lg:mx-0' id="menu-button" aria-expanded="true" aria-haspopup="true">Profile</span>
            </Link>
        </li>
        </>):(
          <>
          <li className="border-t md:border-none">
          <Link to="/signup"  className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><FaUserPlus size="30"  color='gold' className='inline lg:block mx-2 lg:mx-1'/><span className='text-sm'>Join</span></Link>
          </li>
          <li className="border-t md:border-none">
          <Link to="/login"  className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><IoMdLogIn size="30"  color='gold' className='inline lg:block mx-2 lg:mx-1'/><span className='text-sm'>Login</span></Link>
          </li>
          </>
        )}
      </ul>
      
    </nav>
</>

    )
}

export default Navbar
