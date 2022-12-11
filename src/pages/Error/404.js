import React from 'react'
import bgimg from './login-hero.svg'
function Error() {
  return (
    <>
      <div className={`p-0 h-fit bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-700 dark:text-white`}>
        <div className="md:grid h-screen grid-cols-2 gap-4 px-11 place-item-center">
          <img src={bgimg} className="mt-0 py-2 md:w-3/4 w-full" alt="" />
          <div className='font-mono md:mx-12 md:flex items-center'>
            <div className='md:mx-8'>
              <h1 className=' block md:text-9xl text-7xl text-center min-w-full font-extra-bold'>404</h1>
              <span className='text-center block w-full font-bold text-2xl'>THE PAGE YOU ARE LOOKING FOR</span>
              <span className='text-center block w-full font-bold text-2xl sm:mb-52'>DOES NOT EXIST</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error