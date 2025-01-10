import React from 'react'
import { useSelector } from 'react-redux';

const Reviews = () => {
  const user = useSelector((store)=>store?.user)
  if(user){
    return null;
  }
  return (
    
    <div className='bg-blue h-screen'>
      Reviews- User
    </div>
  )
}

export default Reviews
