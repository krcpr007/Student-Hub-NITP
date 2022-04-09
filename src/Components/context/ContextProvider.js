import React, { createContext, useState } from 'react';
import { db, auth } from '../../Firebase'
import { setDoc, doc, getDoc, serverTimestamp, } from "firebase/firestore";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const DataContext = createContext();

export function ContextProvider({ children }) {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [search, setSearch] = useState('');
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
        // const darkMode = localStorage.setItem('mode', JSON.parse(1))
    }
    //  user Information 
    const userInformation = async () => {
        const localAuth = JSON.parse(localStorage.getItem('st-hub'));
        try {
            getDoc(doc(db, 'users', localAuth ? localAuth.uid : null)).then((docSnap) => {
                if (docSnap.exists) {
                    setProfileData(docSnap.data());
                    // console.log(docSnap.data())
                }else{
                    console.log("went wrong to get user profile")
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    // sign up work 
    //Register user with email and password only
    const handleSignUp = (e) => {
        e.preventDefault()
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    localStorage.setItem('st-hub', JSON.stringify(user));
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        name: '',
                        headline: '',
                        bio: '',
                        currentPosition: '',
                        connections: 0,
                        contactInfo: {
                            phoneNo: '',
                            home: '',
                        },
                        socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                        skills: ['', '', '', '', ''],
                        posts: [],
                        profileImg: "https://www.w3schools.com/howto/img_avatar.png ",
                        profileImgPath: "",
                        timeStamp: serverTimestamp()
                    });
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
    // login work 
    const handleLogin = async (e) => {
        e.preventDefault()
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential.user) {
                toast.success('Sign in successfully', {
                    theme: `${darkMode ? 'dark' : 'light'}`
                })
                // console.log(userCredential.user);
                localStorage.setItem("st-hub", JSON.stringify(userCredential.user));
            }
        } catch (error) {
            console.log(error);
            setEmail('');
            setPassword('')
        }
    }
    const githubSignIn = async () => {
        const githubAuthProvider = new GithubAuthProvider();
        const userCredential = await signInWithPopup(auth, githubAuthProvider) //credentials
        const user = userCredential.user;
        localStorage.setItem('st-hub', JSON.stringify(user));
        // Check for user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        // If user, doesn't exist, create user
        //  here i faced the big problem is that whenever try to login its override the user data again and again but now its solved

        if (!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                headline: '',
                bio: '',
                CurrentPosition: '',
                connections: 0,
                contactInfo: {
                    phoneNo: '',
                    home: '',
                },
                socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                skills: ['', '', '', '', ''],
                posts: [],
                profileImg: user.photoURL,
                timeStamp: serverTimestamp()
            })
        }
    }
    const googleSignIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user;
        localStorage.setItem('st-hub', JSON.stringify(user));
        toast.success("Log-In Successfully", {
            theme: `${darkMode ? 'dark' : 'light'}`
        })
        // Check for user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        // If user, doesn't exist, create user
        //  here i faced the big problem is that whenever try to login its override the user data again and again but now its solved

        if (!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                headline: '',
                bio: '',
                CurrentPosition: '',
                connections: 0,
                contactInfo: {
                    phoneNo: '',
                    home: '',
                },
                socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                skills: ['', '', '', '', ''],
                posts: [],
                profileImg: user.photoURL,
                timeStamp: serverTimestamp()

            })
            // navigate('/editProfile')
        }
    }
    // searching logic a user with their data
    const OnSearch = (e) => {
        e.preventDefault()
        if (search.length === 0 || search.trim().length === 0) {
            return
        }
        if (search.length <= 3) {
            toast.info('Enter Full Name Please')
            setSearch('');
            return
        }
        navigate(`/search?name=${search}`);
        setSearch('');
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
            // everyOnes profile
            profileData,
            userInformation,
            //searching 
            search,
            setSearch,
            OnSearch

        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;