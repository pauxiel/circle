// import { NextPage } from 'next'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'
import React, { Component } from 'react';
import Empty from '../asset/empty.svg'
import Image from 'next/image'


const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>

     
       <div className="flex flex-col p-20">

       <Image 
          src={Empty}
          alt='the circle app Logo'
          className="w-full"
          
          />

        <div className="paragraph text-center">
          <h1 className="font-bold text-2xl">Empty feed</h1>
          <p className="text-gray-400">Oops, your feed looks empty but we can solve that, Join communities and get your feed buzzing with tons of infomation</p>
         </div>

       </div>

    </>
  )
}

export default Home
