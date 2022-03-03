import React, { useContext } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoonFill } from 'react-icons/bs'
import ContextProvider from '../context/ContextProvider'
function Darkmode() {
  const { darkMode, changeMode } = useContext(ContextProvider);
  return (
    <button onClick={changeMode} title={`${darkMode ? 'Light Mode' : 'Dark Mode'}`} className={`pl-2.5 w-10 h-9 rounded-full bg-gradient-to-r ${!darkMode ? "text-yellow-200 bg-slate-900 text-xl " : 'bg-slate-900 text-orange-900 text-xl'}`}>
      {darkMode ? <BsSun /> : <BsMoonFill />}
    </button>
  )
}

export default Darkmode