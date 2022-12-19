import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiOutlineTwitter } from "react-icons/ai";
function Footer() {
  return (
    <div
      className={`border-t-2 shadow-2xl dark:bg-slate-900 dark:border-black dark:text-white`}
    >
      <div className="flex px-7 m-3">
        <img src="nitlogo.png" alt="" className="" />
        <h1 className="text-2xl md:text-3xl font-medium m-2">
          <Link to="/" className="text-grey-darkest my-6">
            <span className="text-yellow-500 px-2 mx-0.5">Students</span>
            <span className="bg-yellow-400 rounded px-2 py-1.5">Hub</span>
          </Link>
        </h1>
      </div>
      <div className="md:flex">
        <div className="md:w-1/4 p-2">
          <div className=" sm:px-2.5 mx-4">
            <p className="inline align-middle text-xs font-medium text-justify">
              Student hub for whole Nit Patna.Where students of Nit Patna can
              post their achievements, status, Projects, coding skills, and many
              more things. Here students can connect to each other and they can
              chat with any student of nit Patna. They can also check academic
              details and classes and many more things.
            </p>
          </div>
        </div>
        <div className="md:w-1/4 p-4">
          <h1>Useful links</h1>
          <ul className="text-sm mt-3">
            <li>
              <Link
                className="font-medium text-yellow-500 hover:underline"
                to="/about"
              >
                About
              </Link>
            </li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        </div>
        <div className="md:w-1/4 p-4">
          <h3>Contact Us</h3>
          <div className="p-2">
            <label className="flex text-sm">E-Mail</label>
            <input
              type="email"
              className={` border-yellow-500 h-1/2 my-2 rounded appearance-none bg-transparent bg-black-100 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none dark:text-yellow-400`}
              placeholder="Your Email"
            ></input>
          </div>
          <button type="button" className="btn-sub">
            Subscribe
          </button>
        </div>
        <div className="md:w-1/4 p-4 mx-2">
          <div>
            <span className="footer-title text-center">Social Links</span>
            <div className="grid grid-flow-col gap-4 my-6 ">
              <a
                href="https://www.facebook.com"
                className="text-3xl text-yellow-500"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com"
                className="text-3xl text-yellow-500"
              >
                <IoLogoYoutube />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-3xl text-yellow-500"
              >
                <AiOutlineTwitter />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/krcpr007/Student-Hub-NITP"
                className="text-3xl text-yellow-500"
              >
                <FaGithubAlt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
