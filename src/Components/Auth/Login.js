import React from "react";
import {BiRightArrowAlt} from 'react-icons/bi'
import bg1 from './bgimg/bgLogin.png'

function Login() {
  return (
    <>
      {/* <div>
        <div>
          <div className="gird place-items-center ">
            <div className="card shadow-2xl w-1/4">
              <h1 className="text-left text-4xl font-medium">Sign in</h1>
              <span className="text-sm">Stay updated on your Nitp world</span>
              <form action="" className="">
                <label className="label" htmlFor="email">Email</label>
                <input type="text" className="border border-yellow-400" name="email" id="" />
                <label htmlFor="password">Password</label>
                <input type="text" className="border border-yellow-400" name="password" id="" />
              </form>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div class="w-full max-w-xs justify-center items-center">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div> */}
      <div className="flex h-screen bg-center bg-contain" style={{ backgroundImage:`url(${bg1})`}}>
        <div className="m-auto">
          <div className=" shadow-2xl px-8 pt-6 pb-8 mb-4 bg-white">
            <div className="mb-10">
              <h1 className="text-left text-4xl font-medium">Sign in</h1>
              <span className="text-sm">Stay updated on your Nitp world</span>
            </div>
            <div>
              <form action="" className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineborder border-yellow-400"
                  name="email"
                  id=""
                />
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  type="text"
                  className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-yellow-400"
                  name="password"
                  id=""
                />
                <a href="#">Forgot password?</a> <br />
                <div className="py-2">
                <button className="login-btn">
                <span>Sign in</span>
                <BiRightArrowAlt className="inline"/>
              </button>
                </div>
              </form>
            </div>
            <hr />
            or
            <hr />
            <div>
              Login with google
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
