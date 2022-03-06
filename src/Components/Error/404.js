import React from 'react'
import bgimg from './login-hero.svg'
function Error() {
  return (
    <>
    <div className="p-0 flex">
       <img src={bgimg} className="w-1/4" alt="" />
      <div>
        <h1>404</h1>
        <span>Page doesn't exist </span>
      </div>
    </div>
    </>
  )
}

export default Error