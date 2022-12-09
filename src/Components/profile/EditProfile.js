import React, { useState, useContext, useEffect } from 'react'
import ContextProvider from '../context/ContextProvider'
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../Firebase'
import { toast } from 'react-toastify';
function EditProfile() {
    const { profileData, userInformation } = useContext(ContextProvider);
    let contactInfo = {

    };
    useEffect(() => {
        userInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [loading, setLoading] = useState(false);
    // social media state 
    const [socialMediaDetails, setSocialMediaDetails] = useState({
        instalink: profileData?.socialMedia_urls?.[0],
        gtihublink: profileData?.socialMedia_urls?.[1],
        linkedin: profileData?.socialMedia_urls?.[2],
    })
    //handle to change in social media inputs
    const handleChangeSocialMedia = (e) => {
        setSocialMediaDetails({ ...socialMediaDetails, [e.target.name]: e.target.value })
    }

    // skills state 
    const [skillDetails , setSkillDetails] =useState({
        skill1:profileData?.skills?.[0], 
        skill2:profileData?.skills?.[1],
        skill3:profileData?.skills?.[2], 
        skill4:profileData?.skills?.[3],
        skill5:profileData?.skills?.[4],
    })
    //function to handle change in skills inputs
    const handleSkillsDetails = (e)=>{
        setSkillDetails({...skillDetails, [e.target.name]:e.target.value})
    }
    const [home, setHome] = useState(profileData?.contactInfo?.home);
    const [phoneNo, setPhoneNo] = useState(profileData?.contactInfo?.phoneNo);
    contactInfo = {
        home: home,
        phoneNo: phoneNo,
    }
    const [formData, setFormData] = useState({
        headline: profileData.headline,
        bio: profileData?.bio,
        name: profileData?.name,
        CurrentPosition: profileData.CurrentPosition,
        socialMedia_urls: [profileData?.socialMedia_urls?.[0], profileData?.socialMedia_urls?.[1], profileData?.socialMedia_urls?.[2]],
        // skills: [skill1, skill2, skill3, skill4, skill5]
    })
    const { headline, bio, name, CurrentPosition } = formData;

    //getting changes in property in eg headline,bio, name,
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //form submit function
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const snapshot = doc(db, 'users', auth.currentUser.uid);
        // console.warn("skills", skills)
        try {
            await updateDoc(snapshot, {
                headline, bio, name, socialMedia_urls: [socialMediaDetails.linkedin, socialMediaDetails.instalink, socialMediaDetails.gtihublink], contactInfo, CurrentPosition,
                skills: [skillDetails.skill1, skillDetails.skill2, skillDetails.skill3, skillDetails.skill4, skillDetails.skill5]
            });
            setLoading(false);
            toast.success("Updated")
        } catch (error) {
            console.log(error)
            toast.error("SomeThing went wrong...")
            setLoading(false);
        }
    }
    return (
        <>
            <div className="dark:bg-slate-800">
                <div className='md:grid grid-cols-4'>
                    <div>
                    </div>
                    <div className='p-5 sm:p-10 m-2 col-span-2'>
                        <form>
                            <div className="relative z-0 mb-6 w-full group ">
                                <input type="text" name="name" className={`block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " value={name} onChange={handleChange} required="" />
                                <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="CurrentPosition" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={CurrentPosition} onChange={handleChange} />
                                <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Position (Ex. Ecell web dev)</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="headline" id="floating_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={headline} onChange={handleChange} />
                                <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Headline</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name="bio" id="floating_repeat_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={bio} onChange={handleChange} />
                                <label htmlFor="floating_repeat_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio (tell about yourself)</label>
                            </div>
                            <div className="grid xl:grid-cols-2 xl:gap-6">
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill1" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={skillDetails.skill1} onChange={handleSkillsDetails} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No1. Skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill2" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={skillDetails.skill2} onChange={handleSkillsDetails} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No2. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill3" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={skillDetails.skill3} onChange={handleSkillsDetails} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No3. Skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill4" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={skillDetails.skill4} onChange={handleSkillsDetails} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No4. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="skill5" id="skill5" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={skillDetails.skill5} onChange={handleSkillsDetails} />
                                    <label htmlFor="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No5. skill</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="home" id="floating_last_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  `} placeholder=" " value={home} onChange={e => setHome(e.target.value)} required="" />
                                    <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                </div>
                            </div>
                            <div className="grid xl:grid-cols-2 xl:gap-6">

                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="number" name="phoneNo" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " value={phoneNo} onChange={e => setPhoneNo(e.target.value)} required="" maxLength='10' />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+91 1234567890)</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="linkedin" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " required="" value={socialMediaDetails.linkedin} onChange={handleChangeSocialMedia} />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Linkedin Link</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="linkedin" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " value={socialMediaDetails.instalink} onChange={handleChangeSocialMedia} required="" />
                                    <label htmlFor="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Instagram Link</label>
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="gtihublink" id="floating_company" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 `} placeholder=" " value={socialMediaDetails.gtihublink} onChange={handleChangeSocialMedia} required="" />
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