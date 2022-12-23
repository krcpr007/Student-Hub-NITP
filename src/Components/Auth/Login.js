import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si'
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
import ContextProvider from "../../context/ContextProvider";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../Firebase'
function Login() {
  const navigate = useNavigate();
  const { googleSignIn, githubSignIn, handleLogin, email, setEmail, password, setPassword } = useContext(ContextProvider);
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  }
  useEffect(() => {
    setEmail("");
    setPassword('');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className={`flex h-screen bg-center `} style={{ backgroundImage: `url('cartoon_mainbuilding.jpg')` }}>
        <div className="m-auto">
          <div className={`shadow-2xl rounded px-6 pt-6 pb-8 mb-4 backdrop-blur backdrop-brightness-75 dark:text-white`}>
            <div className="mb-2 text-center">
              <h1 className="text-4xl font-medium text-yellow-500">Sign in</h1>
              <span className="text-sm">Stay updated on your Nit Patna world</span>
            </div>
            <div>
              <form action="" className="">

                <div className="relative z-0 mb-6 w-full group">
                  <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-yellow-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="on"
                    required />
                  <label htmlFor="floating_email" className="absolute text-sm text-yellow-500 dark:text-yellow-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">College email</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type={`${showPass ? 'text' : 'password'}`} name="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-yellow-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    autoComplete="on"
                    required />{showPass ? (<AiFillEye onClick={showPassword} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer" />) : (<AiFillEyeInvisible onClick={showPassword} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer" />)}
                  <label htmlFor="floating_password" className="absolute text-sm text-yellow-500 dark:text-yellow-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <label className="flex justify-between text-yellow-500  text-sm">
                  <Link to="/forgot" className="hover:underline">Forgot password?</Link>
                  <Link className="hover:underline" to="/signup">New here</Link>
                </label>
                <div className="py-2 ">
                  <button className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" type="submit" onClick={handleLogin}>
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
