import React from 'react'
// import img from '../images/1.png'
// import Image from 'next/image'

export default function CreateCommOne() {
  return (
    <div className="">
      <div className="bg-red-300 flex justify-center">
        {/* <Image src={img} alt="bg" className="w-1/2" /> */}
      </div>
      <h4 className="flex justify-center text-red-600 font-semibold italic text-xl pt-3">
        Creating New Communities
      </h4>
      <span className="flex justify-center">
        By creating communities, you agreed to these
      </span>
    </div>
  )
}
