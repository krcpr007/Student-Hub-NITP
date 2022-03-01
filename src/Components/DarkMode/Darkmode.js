import React, { useContext } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoonFill } from 'react-icons/bs'
import ContextProvider from '../context/ContextProvider'
function Darkmode() {
  const { darkMode, changeMode } = useContext(ContextProvider);
  return (
    <button onClick={changeMode} title={`${darkMode ? 'Light Mode' : 'Dark Mode'}`} className={`darkMode bg-gradient-to-r from-indigo-500 ${!darkMode ? "bg-gray-200 " : 'bg-slate-700 text-white'}`}>
      {darkMode ? <BsSun /> : <BsMoonFill />}
    </button>
  )
}

export default Darkmode