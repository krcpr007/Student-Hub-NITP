import { useContext , useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {AiFillEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SiGithub } from 'react-icons/si'
import bg1 from './bgimg/bgLogin.png';
import {AiFillEyeInvisible} from 'react-icons/ai'
import ContextProvider from "../context/ContextProvider";
const Signup = () =>{
    const {googleSignUp , githubSignUp , handleLogin, email ,setEmail ,password ,setPassword ,darkMode } = useContext(ContextProvider);
    const [showPass, setShowPass] = useState(false);
    const showPassord = ()=>{
        showPass?setShowPass(false):setShowPass(true);
    }
    return (
        <>
         <div className={`flex h-screen bg-center bg-contain ${darkMode?'bg-slate-900':"bg-white"}`} >
        <div className="m-auto">
          <div className={ ` shadow-2xl px-6 pt-6 pb-8 mb-4 ${darkMode?'bg-slate-900 text-white':"bg-white"}`}>
            <div className="mb-2 text-center">
            <div className="place-self-center text-2xl">
                <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
                </div>
                <p className="place-self-center">Welcome to community of NIT Patna</p>
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
                    id="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="College email"
                    autoComplete="on"
                    required
                  />
                </div>
                <div className="form-control" >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                  <input
                    type={`${showPass?'text':'password'}`}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineborder focus:border-yellow-400"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    id="password"
                    autoComplete="on"
                    required
                  />  {showPass?(<AiFillEye onClick={showPassord} className="text-lg relative -top-7 left-72 cursor-pointer"/>):(<AiFillEyeInvisible onClick={showPassord} className="text-lg relative -top-7 left-72 cursor-pointer"/>)}
                </div>
                <a href="!">Already have account?</a> <Link to="/login">Login</Link> <br />
                <div className="py-2 ">
                  <button  className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" onClick={handleLogin}>
                    <span>Sign Up</span>
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <div className="mt-2 flex">
              <button onClick={googleSignUp} className="login-signup-btn mx-3">SignUp with
                <div className="icon">
                  <FcGoogle />
                </div>
              </button>
              <button onClick={githubSignUp} className="login-signup-btn">signUp with
                <div className="icon">
                  <SiGithub />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export  default  Signup;