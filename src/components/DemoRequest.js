import React from 'react'
import EnquiryForm from './EnquiryForm'

const DemoRequest = () => {
  return (
    <>
    <div className=" bg-clay flex ">
      <div className="font-poppins text-gray-800 font-semibold text-xl m-8">
        Request A Demo ...!!
      </div>
    </div>
    <div className=" flex justify-between mt-6">
      <div className="w-1/2">
        <h1 className="m-2 p-2 text-xl text-gray-800 font-poppins font-semibold ">
          Please provide your details with confidence.
          Your information is fully{" "}
          <span className="text-blue-600">secure</span> and kept strictly{" "}
          <span className="text-blue-600">confidential.</span>{" "}
          
        </h1>
      </div>
      <div className="w-1/2 border shadow-lg m-2">
      <EnquiryForm/>
      </div>
    </div>
  </>
  )
}

export default DemoRequest
