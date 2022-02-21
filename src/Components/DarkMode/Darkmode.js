import React , {useContext} from 'react'
import {BsSun} from 'react-icons/bs'
import {BsMoonFill} from 'react-icons/bs'
import context from '../context/ContextProvider'
function Darkmode() {
    const {darkMode , setDarkMode , changeMode} = useContext(context); 
  return (
    <div className=''>
        <button onClick={changeMode} className='text-xl'>
            {darkMode?<BsSun/>:<BsMoonFill/>}
        </button>
    </div>
  )
}

export default Darkmode