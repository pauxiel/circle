import React from 'react'
import Image from 'next/image'
import Success from '../asset/success.svg'

export default function CreateCommThree() {
  return (
    <div className=" flex flex-col">
      <div className="bg-indigo-300 flex justify-center">
      <Image src={Success} alt="the social icons" width={35} height={35} className="" />
      </div>
      <h4 className="flex justify-center text-red-600 font-semibold italic text-xl pt-3">
        Community Created
      </h4>
      <p>Do more with your new community. Upload a community profile picture and set rules for your community.</p>
      <button>Start Managing</button>
    </div>
  )
}
