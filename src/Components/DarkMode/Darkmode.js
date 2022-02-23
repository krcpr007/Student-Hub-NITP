import React , {useContext} from 'react'
import {BsSun} from 'react-icons/bs'
import {BsMoonFill} from 'react-icons/bs'
import ContextProvider from '../context/ContextProvider'
function Darkmode() {
    const {darkMode, changeMode} = useContext(ContextProvider); 
  return (
    <div className={`sticky bottom-0 ${!darkMode?"bg-white ":'bg-slate-900 text-white'}`}>
        <button onClick={changeMode} className='text-xl'>
            {darkMode?<BsSun/>:<BsMoonFill/>}
        </button>
    </div>
  )
}

export default Darkmode