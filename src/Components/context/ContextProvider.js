import React, { createContext, useState } from 'react';
import { db  } from '../../Firebase'
import { setDoc, doc, Timestamp , getDoc } from "firebase/firestore";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const DataContext = createContext();

export function ContextProvider({ children }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [profileData ,SetProfileData]=useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const changeMode = () => {
        darkMode ? setDarkMode(false) : setDarkMode(true)
    }
    //  user Information 
    const userInformation = async() =>{
        getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap)=>{
            if(docSnap.exists){
              SetProfileData(docSnap.data());
              console.log(docSnap.data())
            }
          });
    }
     
    // sign up work 
    
    const handleSignUp =(e) => {
        e.preventDefault()
        console.log(email, password);
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async(userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    localStorage.setItem('st-hub', JSON.stringify(user));
                    await setDoc(doc(db, "users", user.uid), {
                        uid:user.uid,
                        name:'',
                        headline:'', 
                        bio:'', 
                        currentPosition:'', 
                        connections:0, 
                        contactInfo:{
                            phoneNo:'', 
                            home:'',
                        },
                        socialMedia_urls:[`${''}`,`${''}`,`${''}`],
                        skills:['React' ,'tailwindcss'],
                        posts:[], 
                        profileImg:"https://www.w3schools.com/howto/img_avatar.png ", 
                        profileImgPath:"", 
                        
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
    const googleSignUp =async ()=>{
        const googleprovider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleprovider)
        const user = result.user;
        console.log(user);
        localStorage.setItem('st-hub', JSON.stringify(user));
        //    await setDoc(doc(db, "users", user.uid), {
        //                 uid:user.uid,
        //             //     name:'',
        //             // headline:'', 
        //             // bio:'', 
        //             // currentPosition:'', 
        //             // connections:0, 
        //             // contactInfo:{
        //             //     phoneNo:'', 
        //             //     home:'',
        //             // },
        //             // socialMedia_urls:[`${''}`,`${''}`,`${''}`],
        //             // skills:['React' ,'tailwindcss'],
        //             // posts:[], 
        //             profileImg:"https://www.w3schools.com/howto/img_avatar.png", 
        //             profileImgPath:"", 
                    
        //         });

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
                localStorage.setItem("st-hub", JSON.stringify(userCreadential.user));
            }
        } catch (error) {
            console.log(error);
            setEmail('');
            setPassword('')
        }
    }
    const githubSignIn = async() => {

        const githubAuthProvider = new  GithubAuthProvider();
       const userCreadential = await signInWithPopup(auth, githubAuthProvider)
        const user = userCreadential.user; 
    //     await setDoc(doc(db, "users", user.uid), {
    //         uid:user.uid,
    //         name:'',
    //     headline:'', 
    //     bio:'', 
    //     currentPosition:'', 
    //     connections:0, 
    //     contactInfo:{
    //         phoneNo:'', 
    //         home:'',
    //     },
    //     socialMedia_urls:[`${''}`,`${''}`,`${''}`],
    //     skills:['React' ,'tailwindcss'],
    //     posts:[], 
    //     profileImg:"https://www.w3schools.com/howto/img_avatar.png", 
    //     profileImgPath:"", 
        
    // });
    }
    const googleSignIn = async () => {

        const googleprovider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleprovider)
        const user = result.user;
        console.log(user);
        localStorage.setItem('st-hub', JSON.stringify(user));
    //          await setDoc(doc(db, "users", user.uid), {
    //         uid:user.uid,
    //     //     name:'',
    //     // headline:'', 
    //     // bio:'', 
    //     // currentPosition:'', 
    //     // connections:0, 
    //     // contactInfo:{
    //     //     phoneNo:'', 
    //     //     home:'',
    //     // },
    //     // socialMedia_urls:[`${''}`,`${''}`,`${''}`],
    //     // skills:['React' ,'tailwindcss'],
    //     // posts:[], 
    //     profileImg:"https://www.w3schools.com/howto/img_avatar.png", 
    //     profileImgPath:"", 
        
    // });

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
            // everyones profile
            profileData, 
            userInformation


        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;