import React, { createContext, useState } from 'react'
const DataContext = createContext();

export function ContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true);
    const changeMode =()=>{
        darkMode?setDarkMode(false):setDarkMode(true)
    }
    return (
        < DataContext.Provider value={darkMode, setDarkMode, changeMode}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;