import React, { createContext, useState } from 'react';
import { app } from '../../Firebase'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
const DataContext = createContext();

export function ContextProvider({ children }) {
    const [userData, setUserData] = useState();
    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
    const githubAuthProvider = new GithubAuthProvider();
    const [darkMode, setDarkMode] = useState(true);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
    }
    const githubSignUp =  () => {
        signInWithPopup(auth, githubAuthProvider)
        .then((resp) => {
            console.log(resp);
        })
    }
    const googleSignUp = async() => {
     const result= await   signInWithPopup(auth, googleprovider)
      const user= result.user; 
      console.log(user);
      setUserData(user); 
      localStorage.setItem('st-hub',userData);
        
    }
    return (
        < DataContext.Provider value={{
            darkMode,
            setDarkMode,
            changeMode,
            googleSignUp,
            githubSignUp
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;