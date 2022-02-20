import React from 'react'
import { FaFacebook } from 'react-icons/fa';
import { FaGithubAlt } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { AiOutlineTwitter } from 'react-icons/ai';

function Footer() {
  return (
  <div className='border-t-4'>
        <div className="md:flex">
            <div className="md:w-1/4 p-6 m-2 hover:border-x-4">
              <div className="flex flex-no-shrink items-center lg:ml-24 sm:ml-10 py-3 text-grey-darkest">
                <h1 className="leading-none text-2xl font-medium text-grey-darkest">
                <a className="no-underline text-grey-darkest hover:text-black" href="/">
                  <span className='text-yellow-500 px-2 mx-0.5'>Students</span><span className='bg-yellow-400 rounded px-2 py-1.5'>Hub</span>
                </a>
            </h1>
            </div>
          <div className="m-2 px-2.5">
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="md:w-1/4 p-6 m-2 hover:border-x-4">
          <p>Useful links</p>
          <ul className="text-xs">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        </div>
        <div className="md:w-1/4 p-6 m-2 hover:border-x-4">
          <h3>Contact Us</h3>
          <div className='p-2'>
            <label className="flex text-xs">E-Mail</label>
            <input className="border-2 border-yellow-500 h-1/2 my-2"></input>
          </div>
          <button type="button" className="bg-yellow-400 p-2 text-xs m-2 rounded-lg">Subscribe</button>
        </div>
        <div className="md:w-1/4 p-6 m-2 hover:border-x-4">
        <div >
          <span className="footer-title">Social Links</span> 
          <div className="grid grid-flow-col gap-4 my-6 ">
           <a href='htpps://www.facebook.com' className='text-3xl text-yellow-500'>
            <FaFacebook />
           </a> 
           <a href='https://www.youtube.com' className='text-3xl text-yellow-500'>
            <IoLogoYoutube />
           </a>
           <a href='https://www.twitter.com' className='text-3xl text-yellow-500'>
            <AiOutlineTwitter />
           </a>
           <a href='https://www.github.com' className='text-3xl text-yellow-500'>
            <FaGithubAlt />
           </a>
         </div>
        </div>
        </div>
      </div>
    </div>
    )
}

export default Footer