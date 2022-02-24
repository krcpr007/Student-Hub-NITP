import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
function Profile() {
  const auth = getAuth(); 
  return (
    <div>
      <div className="w-full md:w-3/4 md:px-24 md:p-2 ">
        <div className="shadow-2xl">
          <div>
            <img
              src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80"
              alt="post-pic"
              className="rounded-t-lg w-full md:h-72"
            />
            <img
              src={`${auth.currentUser?auth.currentUser.photoURL:'https://avatars.githubusercontent.com/u/80947662?v=4'}`}
              alt=""
              className="relative w-1/3 -top-12 md:-top-28 left-5 md:w-1/5 rounded-full border-2 border-gray-400"
            />
          </div>
          <div className="relative -top-10 md:-top-24 md:left-5">
          <h1 className="text-3xl font-medium">{auth.currentUser?`${auth.currentUser.displayName}`:'Ankit is Pig'}</h1>
          <span className="text-sm">Full stack MERN Developer|| CSE Student at NITP || React Fronted Developer</span> <br />
          <span className="text-xs">Patna, Bihar,India</span> <Link className="text-sm text-blue-600" to="/contactInfo">Contact info</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
