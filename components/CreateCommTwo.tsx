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
          <div className="">
            <div className="bg-slate-300 flex justify-center">
              {/* <Image src={img} alt="bg" className="w-1/2" /> */}
            </div>
            <h4 className="flex justify-center text-red-600 font-semibold italic text-xl pt-3">
              Create Community
            </h4>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <label>Community Name</label>
              <input
                placeholder="E.g E.g design Community"
                {...register('commName', {
                  required: {
                    value: true,
                    message: 'please input your community Name',
                  },
                })}
              />

              <label>Industry Type</label>
              <input
                placeholder="Select your Industry"
                {...register('commType', {
                  required: {
                    value: true,
                    message: 'please select your community industry',
                  },
                })}
              />

              <label>About Community</label>
              <input
                placeholder="E.g Design Community bringsd together product designers.."
                {...register('commAbout', {
                  required: {
                    value: true,
                    message: 'please select your community industry',
                  },
                })}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        )
      case 'uploading':
        return <div>loading</div>
      case 'success':
        return <CreateCommThree />
    }
  }

  return <>{renderComponent()}</>
}
