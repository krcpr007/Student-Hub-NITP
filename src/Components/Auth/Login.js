import React, { useState , useContext } from "react";
import bg1 from './bgimg/bgLogin.png';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import ContextProvider from "../context/ContextProvider";
function Login() {
  const {googleSignUp , githubSignUp} = useContext(ContextProvider);
  const [showPass, setShowPass] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault()
  }
  const showPassord = ()=>{
      showPass?setShowPass(false):setShowPass(true);
  }
  return (
    <>
      <div className="flex h-screen bg-center bg-contain" style={{ backgroundImage: `url(${bg1})` }}>
        <div className="m-auto">
          <div className=" shadow-2xl px-6 pt-6 pb-8 mb-4 bg-white">
            <div className="mb-2 text-center">
              <h1 className="text-4xl font-medium">Sign in</h1>
              <span className="text-sm">Stay updated on your Nitp world</span>
            </div>
            <div>
              <form action="" className="">
                <div>

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineborder focus:border-yellow-400"
                    name="email"
                    id=""
                    placeholder="College email"
                  />
                </div>
                <div className="form-control" >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input
                    type={`${showPass?'text':'password'}`}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineborder focus:border-yellow-400"
                    name="password"
                    placeholder="Password"
                    id=""
                  />  {showPass?(<AiFillEye onClick={showPassord} className="text-lg relative -top-7 left-72 cursor-pointer"/>):(<AiFillEyeInvisible onClick={showPassord} className="text-lg relative -top-7 left-72 cursor-pointer"/>)}
                </div>
                <a href="!">Forgot password?</a> <br />
                <div className="py-2 ">
                  <button className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" onClick={handleLogin}>
                    <span>Sign in</span>
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <div className="mt-2 flex">
              <button onClick={googleSignUp} className="login-signup-btn mx-3">Login with
                <div className="icon">
                  <FcGoogle />
                </div>
              </button>
              <button onClick={githubSignUp} className="login-signup-btn">Login with
                <div className="icon">
                  <SiGithub />
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
