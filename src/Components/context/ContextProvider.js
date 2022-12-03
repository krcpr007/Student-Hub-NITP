import React, { createContext, useState } from 'react';
import { db, auth } from '../../Firebase'
import { setDoc, doc, getDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, } from "firebase/firestore";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const DataContext = createContext();

export function ContextProvider({ children }) {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    //  user Information form localAuth
    const userInformation = async () => {
        const localAuth = JSON.parse(localStorage.getItem('st-hub'));
        try {
            getDoc(doc(db, 'users', localAuth ? localAuth.uid : null)).then((docSnap) => {
                if (docSnap.exists) {
                    setProfileData(docSnap.data());
                    // console.log(docSnap.data())
                } else {
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
                        contactInfo: {
                            phoneNo: '',
                            home: '',
                            email: user.email,
                        },
                        socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                        skills: ['', '', '', '', ''],
                        posts: [],
                        connections: [],
                        connectionRequests: [],
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
                toast.success('Sign in successfully')
                // console.log(userCredential.user);
                localStorage.setItem("st-hub", JSON.stringify(userCredential.user));
            }
        } catch (error) {
            console.log(error);
            // setEmail('');
            // setPassword('')
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
                    email: user.email
                },
                socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                skills: ['', '', '', '', ''],
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
        toast.success("Log-In Successfully")
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
                    email: user.email,
                },
                socialMedia_urls: [`${''}`, `${''}`, `${''}`],
                skills: ['', '', '', '', ''],
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
    //function to send request to the user
    const sendConnectionRequest = (user) => {
        //pages where we can send the requests 
        //search , userProfile , userprofileCard , 
        const reqRef = doc(db, 'users', user?.uid)
        if (user?.connectionRequests?.includes(profileData?.uid)) {
            console.log("already sended request")
        } else {
            updateDoc(reqRef, {
                connectionRequests: arrayUnion(profileData.uid)

            }).then(() => {
                console.log("connectionRequests send")
            }).catch((e) => console.log(e))
        }

    }
    //function to remove connection request
    const removeConnectionRequest = (user) => {
        const selfRef = doc(db, 'users', profileData?.uid)
        if (profileData?.connectionRequests?.includes(user?.uid)) {
            updateDoc(selfRef, {
                connectionRequests: arrayRemove(user?.uid)
            }).then(() => {
                console.log("connectionRequests removed")
            }).catch((e) => console.log(e))
        } else {
            console.log("No connection request")
        }
    }
    // function to undo the sended connection request 
    const undoConnectionRequest = (user) => {
        const reqRef = doc(db, 'users', user?.uid)
        updateDoc(reqRef, {
            connectionRequests: arrayRemove(profileData.uid)
        }).then(() => {
            console.log("connectionRequests undo")
        }).catch((e) => console.log(e))
    }
    const removeConnection = (user) => {
        const reqRef = doc(db, 'users', user?.uid)
        updateDoc(reqRef, {
            connections: arrayRemove(profileData?.uid)
        }).then(() => {
            console.log("connections removed from user")
        }).catch((e) => console.log(e))
        const selfRef = doc(db, 'users', profileData?.uid)
        updateDoc(selfRef, {
            connections: arrayRemove(user?.uid)
        }).then(() => {
            console.log("connections removed from self ")
        }).catch((e) => console.log(e))

    }
    const acceptConnectionRequest = (user) => {
        const selfRef = doc(db, 'users', profileData?.uid)
        if (profileData?.connectionRequests?.includes(user?.uid)) {
            updateDoc(selfRef, {
                connectionRequests: arrayRemove(user.uid) //removing the user.uid from request array
            }).then(() => {
                console.log("connectionRequest uid moving to connection")
            }).catch((e) => {
                console.log(e)
                console.log("At time of moving from connectionRequest from to connection");
            })
            if (!(profileData?.connections?.includes(user.uid))) { //checking it is already in the connection array or not
                const userRef = doc(db, 'users', user.uid)
                updateDoc(userRef, {
                    connections: arrayUnion(profileData.uid)
                }).then(() => {
                    console.log("connections added to user")
                }).catch((e) => console.log(e))
                updateDoc(selfRef, {
                    connections: arrayUnion(user.uid)
                }).then(() => {
                    console.log("connections added to self also")
                }).catch((e) => console.log(e))
                // connection accepted successfully 
                console.log("Connected finally");
            }
        } else {
            alert("Their is none connection request");
        }
    }
    return (
        < DataContext.Provider value={{
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
            OnSearch,
            // connections
            undoConnectionRequest,
            sendConnectionRequest,
            removeConnectionRequest,
            removeConnection,
            acceptConnectionRequest


        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;