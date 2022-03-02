import React, { createContext, useState } from 'react';
// import { app } from '../../Firebase'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const DataContext = createContext();

export function ContextProvider({ children }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
    }
    // sign up work 

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log(email, password);
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    localStorage.setItem('st-hub', (user));
                    navigate("/");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage, errorCode);
                    // ..
                });
        } catch (error) {
            console.log(error); 
        }
    }
    const googleSignUp = ()=>{
        const githubAuthProvider = new GithubAuthProvider();
        signInWithPopup(auth, githubAuthProvider)
            .then((resp) => {
                console.log(resp);
            })

    }
    const githubSignUp = ()=>{

    }
    // login work 
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email, password);
        try {
            const auth = getAuth();
            const userCreadential = await signInWithEmailAndPassword(auth, email, password)
            if (userCreadential.user) {
                alert("sign in succefully");
                console.log(userCreadential.user);
            }
        } catch (error) {
            console.log(error);
            setEmail('');
            setPassword('')
        }
    }
    const githubSignIn = () => {

        const githubAuthProvider = new  GithubAuthProvider();
        signInWithPopup(auth, githubAuthProvider)
            .then((resp) => {
                console.log(resp);
            })
    }
    const googleSignIn = async () => {

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
            googleSignIn,
            githubSignIn,
            email, setEmail, password, setPassword,
            handleLogin,
            handleSignUp,
            googleSignUp, 
            githubSignUp, 

        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;