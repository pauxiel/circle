import React from 'react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useCreate } from '../context/contextCreate'
import useNavigation from '../hooks/useNavigation'
import CreateCommThree from './CreateCommThree'
// import img from '../images/2.png'
// import Image from 'next/image'

export default function CreateCommTwo() {
  const { navIndex, navHandler } = useNavigation()
  const { state, setState } = useCreate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  })

  const router = useRouter()

  const onSubmitForm = async (values) => {
    setState('uploading')

    navHandler('next')
    const createComm: AxiosRequestConfig = {
      url: '/api/createComm',
      data: values,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(createComm)
    if (res.status === 200) {
      setState('success')
      console.log(state)
      // router.push('/', '/')
    }
  }

  const renderComponent = () => {
    switch (state) {
      case 'choosing':
        return (
          <div className="px-4 ">
            <div className="mb-4 mt-2">
          <h1 className="font-bold text-2xl">  Creating New Communities</h1>
          <span className="text-sm text-gray-400"> By creating communities, you agreed to these</span>
            </div>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-3">

            <div className="flex flex-col space-y-3">
            <label>Community Name</label>
              <input
              className="border rounded-md p-2 focus:ring-1 focus:border-blue-700 outline-none "
                placeholder="E.g design Community"
                {...register('commName', {
                  required: {
                    value: true,
                    message: 'please input your community Name',
                  },
                })}
              />

            </div>
             
            <div className="flex flex-col space-y-3">
              <label>Industry Type</label>
              <input
              className="border rounded-md p-2 focus:ring-1 focus:border-blue-700 outline-none "
                placeholder="Type your Industry"
                {...register('commType', {
                  required: {
                    value: true,
                    message: 'please select your community industry',
                  },
                })}
              />
              </div>


              <div className="flex flex-col space-y-3">
              <label>About Community</label>
              <textarea
              rows="5"
              className="border rounded-md p-2 focus:ring-1 focus:border-blue-700 outline-none"
                placeholder="E.g Design Community bringsd together product designers.."
                {...register('commAbout', {
                  required: {
                    value: true,
                    message: 'please select your community industry',
                  },
                })}
              ></textarea>
              </div>

              <button className="border py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white" type="submit">Create Community</button>
            </form>
          </div>
        )
      case 'uploading':
        return <div className="text-heading space-y-4 flex items-center flex-col justify-center h-screen">
        <h1 className="text-3xl font-bold italic">Loading Please Wait...</h1>
        </div>
      case 'success':
        return <CreateCommThree />
    }
  }

  return <>{renderComponent()}</>
}
