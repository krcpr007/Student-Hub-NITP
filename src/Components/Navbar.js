import React from 'react'
import {ImHome} from 'react-icons/im'
import {BiNetworkChart} from 'react-icons/bi'
import {FaMedal} from 'react-icons/fa'
function Navbar() {
    return (
 <>
<nav className="nav flex flex-wrap items-center justify-between px-4 shadow">
  <div className="flex flex-no-shrink items-center lg:ml-24 sm:ml-10 py-3 text-grey-darkest">
    <h1 className="leading-none text-2xl font-medium text-grey-darkest">
      <a className="no-underline text-grey-darkest hover:text-black" href="/">
      <span className='text-yellow-500'>CAMP</span><span className='bg-yellow-400'>YELLOW</span>
      </a>
    </h1>
  </div>
  <input className="menu-btn hidden" type="checkbox" id="menu-btn"/>
  <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
    <span className="navicon bg-grey-darkest flex items-center relative"></span>
  </label>
  <ul className='menu'>
  <input className="px-10 py-1  rounded-lg border-2 border-yellow-200 md:w-auto " placeholder="Search" type="text"/>
  </ul>
  <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
  
    <li className="border-t md:border-none">
      <a href="/feed" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"> <ImHome size="30" color='gold' className='inline lg:block mx-2'/><span className='text-sm'>My Feed</span></a>
    </li>
    
    <li className="border-t md:border-none">
      <a href="/opportunities" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><FaMedal size="30" color='gold'className='inline lg:block mx-2 lg:mx-6'/> <span className='text-sm'> Opportunities</span> </a>
    </li>
    
    <li className="border-t md:border-none">
      <a href="/networks" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><BiNetworkChart size="30"  color='gold' className='inline lg:block mx-2 lg:mx-5'/><span className='text-sm'>Networks</span></a>
    </li>
    <li className="border-t md:border-none">
      <a href="/profile" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">
      <img src="https://avatars.githubusercontent.com/u/80947662?v=4" alt="" className='w-7 rounded-full border-2 border-gray-400 inline lg:block' />
        <span className='text-sm mx-2 lg:mx-0'>Profile</span></a>
    </li>
  </ul>
</nav>
</>

    )
}

export default Navbar
