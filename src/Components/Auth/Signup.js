import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SiGithub } from 'react-icons/si'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase'
import bgImg from '../../assets/bgLogin.png'
import ContextProvider from "../../context/ContextProvider";
const Signup = () => {
  const navigate = useNavigate();
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
  const { googleSignIn, githubSignIn, email, setEmail, password, setPassword,fullName ,setFullName, handleSignUp } = useContext(ContextProvider);
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  }
  return (
    <>
      <div className={`flex h-screen bg-center bg-contain`} style={{ backgroundImage: `url(${bgImg})` }} >
        <div className="m-auto">
          <div className={` shadow-2xl px-6 pt-6 pb-8 mb-4  dark:text-white  bg-white text-gray-600`}>
            <div className="mb-2 text-center">
              <div className="place-self-center text-2xl hover:text-black">
                <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
              </div>
              <p className="place-self-center">Welcome to the NIT Patna</p>
            </div>
            <div>
              <form>
              <div className="relative z-0 mb-6 w-full group">
                  <input type="text" name="full_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-yellow-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " id="full_name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    autoComplete="on"
                    required />
                  <label htmlFor="full_name" className="absolute text-sm text-yellow-500 dark:text-yellow-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-yellow-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="on"
                    required />
                  <label htmlFor="email" className="absolute text-sm text-yellow-500 dark:text-yellow-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">College email</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type={`${showPass ? 'text' : 'password'}`} name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-yellow-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    autoComplete="on"
                    required />{showPass ? (<AiFillEye onClick={showPassword} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer" />) : (<AiFillEyeInvisible onClick={showPassword} className="text-lg relative -top-7 left-60 md:left-72 cursor-pointer" />)}
                  <label htmlFor="password" className="absolute text-sm text-yellow-500 dark:text-yellow-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className='text-yellow-600 text-xs flex justify-between'>
                  <span>Already have account?</span> <Link to="/login" className='hover:underline'>Login</Link>
                </div>
                <div className="py-2 ">
                  <button type='submit' className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" onClick={handleSignUp}>
                    <span>Sign Up</span>
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <div className="mt-2 flex">
              <button onClick={googleSignIn} className="login-signup-btn mx-3">SignUp with
                <div className="icon">
                  <FcGoogle />
                </div>
              </button>
              <button onClick={githubSignIn} className="login-signup-btn">SignUp with
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
export default Signup;