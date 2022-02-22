import React, { createContext, useState  } from 'react';
import { app } from '../../Firebase'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup , signInWithEmailAndPassword} from 'firebase/auth'
const DataContext = createContext();

export function ContextProvider({ children }) {
    const [userData, setUserData] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
    }
    // login work 
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email , password); 
        try {
            const auth = getAuth(); 
            const userCreadential = await signInWithEmailAndPassword(auth, email ,password)
            if(userCreadential.user){
                alert("sign in succefully"); 
                console.log(userCreadential.user);
            }
            
        } catch (error) {
             console.log(error); 
        }
      }
    const githubSignUp = () => {
        const auth = getAuth();
        const githubAuthProvider = new GithubAuthProvider();
        signInWithPopup(auth, githubAuthProvider)
            .then((resp) => {
                console.log(resp);
            })
    }
    const googleSignUp = async () => {
        const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleprovider)
        const user = result.user;
        console.log(user);
        setUserData(user);
        localStorage.setItem('st-hub', userData);

    }
    return (
        < DataContext.Provider value={{
            darkMode,
            setDarkMode,
            changeMode,
            googleSignUp,
            githubSignUp,
            email, setEmail, password, setPassword,
            handleLogin,
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;