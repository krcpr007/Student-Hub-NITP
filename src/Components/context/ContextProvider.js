import React, { createContext, useState } from 'react';
import { db, auth } from '../../Firebase'
import { setDoc, doc, getDoc, serverTimestamp, Timestamp} from "firebase/firestore";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, } from 'react-router-dom';
const DataContext = createContext();

export function ContextProvider({ children }) {
    const navigate = useNavigate();
    const [profileData, SetProfileData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
        // const darkMode = localStorage.setItem('mode', JSON.parse(1))
    }
    //  user Information 
    const userInformation = async () => {
        getDoc(doc(db, 'users', auth ? auth.currentUser.uid : null)).then((docSnap) => {
            if (docSnap.exists) {
                SetProfileData(docSnap.data());
                console.log(docSnap.data())
            }
        });
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
                    console.log(user);
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
                        skills: ['React', '', '', '', ''],
                        posts: [],
                        profileImg: "https://www.w3schools.com/howto/img_avatar.png ",
                        profileImgPath: "",
                        timeStamp:serverTimestamp()
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

            const userCreadential = await signInWithEmailAndPassword(auth, email, password)
            if (userCreadential.user) {
                alert("sign in succefully");
                console.log(userCreadential.user);
                localStorage.setItem("st-hub", JSON.stringify(userCreadential.user));
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
        //  here i faced the bigest problem is that whenevry try to login its overide the user data again and again but now its solved

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
                skills: ['React', 'tailwindcss'],
                posts: [],
                profileImg: user.photoURL ,
                timeStamp:serverTimestamp()
            })
        }
    }
    const googleSignIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user;
        localStorage.setItem('st-hub', JSON.stringify(user));
        // Check for user
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        // If user, doesn't exist, create user
        //  here i faced the bigest problem is that whenevry try to login its overide the user data again and again but now its solved

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
                skills: ['React', 'tailwindcss'],
                posts: [],
                profileImg: user.photoURL,
                timeStamp:serverTimestamp()

            })
            // navigate('/editProfile')
        }
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
            // everyones profile
            profileData,
            userInformation
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;