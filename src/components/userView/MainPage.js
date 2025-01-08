import React from 'react'
import { useSelector } from 'react-redux'

const MainPage = () => {
    // const {user} = useSelector(store=>store.user)
  return (
    <div className='m-4 p-10 text-2xl h-screen'>
      Welcome User
      {/* {user} */}
    </div>
  )
}

export default MainPage
