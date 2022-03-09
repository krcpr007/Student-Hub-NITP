import React, { useState, useContext, useEffect } from 'react'
import ContextProvider from '../context/ContextProvider'
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../Firebase'
function EditProfile() {
    let contactInfo = {

    };
    useEffect(() => {
        userInformation();
    }, [])
    const { darkMode, profileData, userInformation } = useContext(ContextProvider);
    const [loading, setLoading] = useState(false);
    // social media state 
    const [instalink, setInstalink] = useState(profileData.socialMedia_urls[0]);
    const [gtihublink, setGithublink] = useState(profileData.socialMedia_urls[1]);
    const [linkedin, setLinkedinlink] = useState(profileData.socialMedia_urls[2]);
      // skills state 
    const [skill1, setSkill1] = useState(profileData.skills[0]);
    const [skill2, setSkill2] = useState(profileData.skills[1]);
    const [skill3, setSkill3] = useState(profileData.skills[2]);
    const [skill4, setSkill4] = useState(profileData.skills[3]);
    const [skill5, setSkill5] = useState(profileData.skills[4]);  

    const [home, setHome] = useState(profileData.contactInfo.home);
    const [phoneNo, setPhoneNo] = useState(profileData.contactInfo.phoneNo);
    contactInfo = {
        home: home,
        phoneNo: phoneNo,
    }
    const [formData, setFormData] = useState({
        headline: profileData.headline,
        bio: profileData.bio,
        name: auth.currentUser.displayName ? auth.currentUser.displayName : profileData.name,
        CurrentPosition: profileData.CurrentPosition,
        socialMedia_urls: [instalink, gtihublink, linkedin],
        skills: [skill1, skill2, skill3, skill4, skill5]
    })
    const { headline, bio, name, CurrentPosition, skills } = formData;
    console.log("skills", skills);
    //geting changes in property in eg headline,bio, name,
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    console.log("skiils", skill1, skill2, skill3, skill4, skill5);
    //form submit function
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const snapshot = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(snapshot, {
            headline, bio, name, socialMedia_urls: [linkedin, instalink, gtihublink], contactInfo, CurrentPosition ,
            skills: [skill1, skill2, skill3, skill4, skill5]
        });
        setLoading(false);
    }
    return (
        <>
            <div className={`bg-slate-600/80`}>
                <div>
                    <div className='p-10'>

                        <form>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="name" className={`block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " value={name} onChange={handleChange} required="" />
                                <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="CurrentPosition" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " required="" value={CurrentPosition} onChange={handleChange} />
                                <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Position (Ex. Ecell web dev)</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="headline" id="floating_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " required="" value={headline} onChange={handleChange} />
                                <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Headline</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="bio" id="floating_repeat_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " required="" value={bio} onChange={handleChange} />
                                <label htmlFor="floating_repeat_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio (tell about yourself)</label>
                            </div>
                            <div className="grid xl:grid-cols-2 xl:gap-6">
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill1" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" value={skill1} onChange={e=>setSkill1(e.target.value)} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No1. Skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill2" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" value={skill2} onChange={e=>setSkill2(e.target.value)} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No2. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill3" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" value={skill3} onChange={e=>setSkill3(e.target.value)} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No3. Skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill4" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" value={skill4} onChange={e=>setSkill4(e.target.value)}/>
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No4. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill5" id="skill5" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " required="" value={skill5} onChange={e=>setSkill5(e.target.value)} />
                                    <label htmlFor="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No5. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="phoneNo" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={home} onChange={e => setHome(e.target.value)} required="" />
                                    <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                </div>
                            </div>
                            <div className="grid xl:grid-cols-2 xl:gap-6">

                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="floating_company" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " value={phoneNo} onChange={e => setPhoneNo(e.target.value)} required="" />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+91 1234567890)</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="floating_company" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " required="" value={linkedin} onChange={e => setLinkedinlink(e.target.value)} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Linkedin Link</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="floating_company" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " value={instalink} onChange={e => setInstalink(e.target.value)} required="" />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Instagram Link</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="floating_company" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${darkMode ? 'input-dark' : "input-non-dark"}`} placeholder=" " value={gtihublink} onChange={e => setGithublink(e.target.value)} required="" />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Github Link</label>
                                </div>

                            </div>
                            <button type="submit" className={`btn-sub ${loading ? 'animate-pulse' : "null"}`} onClick={onSubmit}>
                                {loading ? 'Pls wait...' : 'Submit'}</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile