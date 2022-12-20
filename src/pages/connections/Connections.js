import React from 'react'
import GroupsClub from '../../Components/Feed/GroupsClub'
import LeftAboutCard from '../../Components/Feed/LeftAboutCard'
// import ProfileCard from '../Search/ProfileCard'
import ConnectionRequests from './ConnectionRequests'
import RandomUser from './RandomUser'
function Connections() {
    return (
        <>
            <div>
                <div className='sm:flex'>
                    <div className='hidden md:block'>
                        <LeftAboutCard />
                        <GroupsClub />
                    </div>
                    <div className='mx-2'>
                        <ConnectionRequests />
                        {/* Random users will display here */}
                        <div className='w-full'>
                            <RandomUser />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connections