import React from 'react'

export default function CommButton(props) {
  return (
    <>
     <div className="text-heading space-y-4 flex items-center flex-col justify-center h-screen">
    <h1 className="text-3xl font-bold">Create a Community to Get Started</h1>
    <button
      onClick={() => props.toggler()} // just added
      className="border py-2 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      Create Communities
    </button>
   </div>
   
    </>
   
  )
}
// the rest of the code should be the same
