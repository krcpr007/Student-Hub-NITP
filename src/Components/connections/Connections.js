import React from 'react'
import GroupsClub from '../Feed/GroupsClub'
import LeftAboutCard from '../Feed/LeftAboutCard'
// import ProfileCard from '../Search/ProfileCard'
import ConnectionRequests from './ConnectionRequests'
import RandomUser from './RandomUser'
function Connections() {
    return (
        <>
            <div>
                <div className='sm:flex'>
                    <div className='hidden md:block sm:w-1/4'>
                        <LeftAboutCard />
                        <GroupsClub />
                    </div>
                    <div className='mx-2'>
                        <ConnectionRequests />
                        {/* Random users will display here */}
                        <RandomUser />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connections