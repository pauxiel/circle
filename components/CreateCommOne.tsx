import React from 'react'
import Image from 'next/image'
import Globe from '../asset/globe2.svg'
import Shield from '../asset/shield.svg'
import Book from '../asset/book.svg'



export default function CreateCommOne() {
  return (
    <div className="px-6 py-6">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">  Creating New Communities</h1>
          <span className="text-sm text-gray-400"> By creating communities, you agreed to these</span>
        </div>

        <div className="mb-4 flex items space-x-4">
          <div>
          <Image src={Globe} alt="the social icons" width={35} height={35} className="" />
          </div>
       
         <div className="heading ">
          <h1 className="font-bold text-md">Your community is public</h1>
          <span className="text-sm text-gray-400">Your community is public
          Communities on circcle is visible to everyone for now, We are working on private community, Stay updated</span>
        </div>
        </div>

        <div className="mb-4 flex items space-x-4">
          <div>
          <Image src={Shield} alt="the social icons" width={20} height={20} className="" />
          </div>
       
         <div className="heading ">
          <h1 className="font-bold text-md">Build trust</h1>
          <span className="text-sm text-gray-400">As a community manager, you should ensure your space is habitable for all</span>
        </div>
        </div>


        <div className="mb-4 flex items space-x-4">
          <div>
          <Image src={Book} alt="the social icons" width={20} height={20} className="" />
          </div>
       
         <div className="heading ">
          <h1 className="font-bold text-md">Pre commnuity rules</h1>
          <ul className="text-sm text-gray-500 list-disc px-6" >
            <li>Be kind and respectful</li>
            <li>Stick to the community purpose</li>
            <li>Explore and connect</li>
          </ul>
        </div>
        </div>




     
  
    </div>
  )
}
