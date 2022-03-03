import React, { useState , useContext ,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import bg1 from './bgimg/bgLogin.png';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import ContextProvider from "../context/ContextProvider";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function Login() {
  
  const auth = getAuth(); 
  const navigate = useNavigate();
  const {googleSignIn , githubSignIn , handleLogin, email ,setEmail ,password ,setPassword , darkMode } = useContext(ContextProvider);
  const [showPass, setShowPass] = useState(false);
  const showPassord = ()=>{
      showPass?setShowPass(false):setShowPass(true);
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        navigate('/')
      }
    })
},[]) 
useEffect(()=>{
  setEmail("");
  setPassword('');
},[])
  return (
    <>
      <div className={`flex h-screen bg-center bg-contai`} style={{ backgroundImage: `url(${bg1})` }}>
        <div className="m-auto">
          <div className= {`shadow-2xl rounded px-6 pt-6 pb-8 mb-4 bg-white  ${darkMode?'bg-slate-900 text-white':null} `}>
            <div className="mb-2 text-center">
              <h1 className="text-4xl font-medium">Sign in</h1>
              <span className="text-sm">Stay updated on your Nitp world</span>
            </div>
            <div>
              <form action="" className="">

                <div className="relative z-0 mb-6 w-full group">
                    <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "id="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    autoComplete="on"
                    required />
                    <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">College email address</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type={`${showPass?'text':'password'}`} name="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-700 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={password}
                    onChange={e=>setPassword(e.target.value)}
                    id="password"
                    autoComplete="on"
                    required />{showPass?(<AiFillEye onClick={showPassord} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer"/>):(<AiFillEyeInvisible onClick={showPassord} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer"/>)}
                    <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <label className="block text-blue-500  text-sm">
                  <Link to="/forgot" className="hover:underline">
                    Forgot password?
                  </Link>
                  <Link className="relative left-24 md:left-36 hover:underline" to="/signup">New here</Link>
                </label>
                <div className="py-2 ">
                  <button  className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" onClick={handleLogin}>
                    <span>Sign in</span>
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <div className="mt-2 flex">
              <button onClick={googleSignIn} className="login-signup-btn mx-3">Login With
                <div className="icon">
                  <FcGoogle />
                </div>
              </button>
              <button onClick={githubSignIn} className="login-signup-btn">Login With
                <div className="icon">
                  <SiGithub className="text-slate-900" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
