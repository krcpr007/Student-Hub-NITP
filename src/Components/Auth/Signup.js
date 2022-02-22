import React, { useState , useContext } from "react";
import { FcGoogle } from 'react-icons/fc';
import ContextProvider from "../context/ContextProvider";
const signup = () =>{
    return (
        <>
        <div className='h-screen'>
        <div className='md:flex flex-col '>
            <div className='grid h-fit w-screen p-5'>
                <div className="place-self-center text-2xl">
                <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
                </div>
                <p className="place-self-center">Welcome to community of NIT Patna</p>
            </div>
            <div className='h-1/2 md:w-3/12 bg-yellow-50 place-self-center p-4 rounded-lg m-4 shadow-2xl' >
                <div className=''>
                    <label className='block text-gray-700 text-sm mt-2'>Email or phone number</label>
                    <input className="appearance-none border border-gray-700 rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outlineborder focus:border-yellow-400"/>
                </div>
                <div>
                    <label className='block text-gray-700 text-sm mt-2'> Password (6 or more characters) </label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 border-gray-600 leading-tight focus:outline-none focus:shadow-outlineborder focus:border-yellow-400"/>
                </div>
                <p className="text-gray-700 text-sm mt-2 text-center">
                    By clicking Agree and signup, you become a part of NIT Patna community 🙂
                </p>
                <button type="button" className="bg-yellow-400 w-11/12 p-2 m-2 rounded-2xl text-center">Agree and Sign up</button>
                <p className="text-center">or</p>
                <button  className="login-signup-btn rounded-full m-3 w-11/12">Login with
                <div className="icon">
                  <FcGoogle />
                </div>
              </button>
              <p className="text-gray-700 text-sm mt-2 text-center">Already on Student Hub? <a href="#" className="text-indigo-500 underline decoration-indigo-500">Login</a></p>
            </div>
        </div>
    </div>
        
        </>
    )
}
export  default  signup;