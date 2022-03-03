import { useContext , useState , useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {AiFillEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SiGithub } from 'react-icons/si'
import {AiFillEyeInvisible} from 'react-icons/ai'
import { onAuthStateChanged , getAuth  } from 'firebase/auth';
import ContextProvider from "../context/ContextProvider";
const Signup = () =>{
    const auth = getAuth(); 
    const navigate = useNavigate();
    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        console.log(user)
        if(user){
          navigate('/')
        }
      })
  },[]) 
    const {googleSignUp , githubSignUp , email ,setEmail ,password ,setPassword ,darkMode, handleSignUp } = useContext(ContextProvider);
    const [showPass, setShowPass] = useState(false);
    const showPassord = ()=>{
        showPass?setShowPass(false):setShowPass(true);
    }
   useEffect(()=>{
     setEmail("");
     setPassword('');
   },[])
    return (
        <>
         <div className={`flex h-screen bg-center bg-contain ${darkMode?'bg-slate-900':"bg-white"}`} >
        <div className="m-auto">
          <div className={ ` shadow-2xl px-6 pt-6 pb-8 mb-4 ${darkMode?'bg-slate-900 text-white':"bg-white text-gray-600"}`}>
            <div className="mb-2 text-center">
            <div className="place-self-center text-2xl">
                <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
                </div>
                <p className="place-self-center">Welcome to community of NIT Patna</p>
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
                <a href="!">Already have account?</a> <Link to="/login">Login</Link> <br />
                <div className="py-2 ">
                  <button  className="bg-yellow-300 shadow-2xl w-full rounded-lg font-medium hover:bg-yellow-400 p-2" onClick={handleSignUp}>
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
              <button onClick={githubSignUp} className="login-signup-btn">SignUp with
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