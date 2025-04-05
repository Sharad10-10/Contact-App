import React from 'react'
import NoContactImage from '../src/images/Hands_Contact.png'

const NoContactFound = () => {
  return (
        <div className='flex items-center flex-col mt-4'>
            <img src= {NoContactImage} alt="NoContactImage" />
            <h3 className='text-white mt-2 font-medium'>No Contacts Found</h3>
        </div>
  )
}

export default NoContactFound;