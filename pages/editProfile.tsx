// import { format } from "url";
import {
  chakra,
  Button,
  Select,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import Malemoji from '../asset/malemoji.svg'
import ProfileCover from '../asset/coverprofile.svg'
import Globe from '../asset/globe.svg'
import Briefcase from '../asset/briefcase.svg'
import Spotify from '../asset/spotify.svg'
import Link from 'next/link'
import Image from 'next/image'

function EditProfile() {
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
    const editUserProfile: AxiosRequestConfig = {
      url: '/api/editUserProfile',
      data: values,
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(editUserProfile)
    if (res.status === 200) {
      router.push('/about')
    }
  }

  return (
    <>

<>
    <div className="flex flex-col h-screen">

    <div className="cover-image relative -z-10 ">
    <Image 
  src={ProfileCover }
  alt='the profile image preview'
  className=""
      />
    </div>

    <div className="flex items-center px-6 mb-6 space-x-4">

    <div className="flex items-center shadow-md w-28 p-1 rounded-full  -mt-14 bg-white">
    <div className="profile-avatar  w-28 rounded-full flex items-center z-10 ">
    <Image 
  src={ Spotify } 
  alt='the profile image preview'
  className=""
  width={130} height={130}
      />
    </div>

   
    </div>

    <div className="button border mt-3 px-6 py-2 flex items-center rounded-full w-40 font-Outfit hover:bg-blue-600 hover:text-white ">
      <label htmlFor="" className="relative ">Change Avatar</label>
    <input type="file" name="" id="" className=" absolute  opacity-0 w-32" />
    </div>

    </div>


   <form action="" className="px-6 space-y-4 w-3/4 mt-4" onSubmit={handleSubmit(onSubmitForm)}>

   <div className="name w-full flex flex-col font-Outfit space-y-2">
      <label htmlFor="name" className="text-xl">Display Name</label>
      <input type="text" name=""  id="" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none " placeholder='Eg, HarryUde'  {...register('username', {
            required: { value: true, message: 'please type a username' },
          })}/>

        {errors.username && <p className="text-red-500 my-2 italic">{errors.username.message}</p>}

      </div>

      <div className="name w-full flex flex-col font-Outfit space-y-2">
      <label htmlFor="name" className="text-xl">About</label>
      <textarea rows="4" cols="50" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none " placeholder='Eg. I’m a Web developer, currently based in Nigeria'  {...register('bio', {
            required: { value: true, message: 'please input your bio' },
          })}></textarea>
           {errors.bio && <p className="text-red-500 my-2 italic">{errors.bio.message}</p>}
      </div>


      <div className="buttons flex items-center space-x-4">
      <div className="button border  px-6 py-2 flex items-center text-white rounded-full font-Outfit bg-blue-600 hover:bg-blue-700">
    <button type = 'submit'>
        Save
      </button>
    </div>

    <div className="button border ml-auto px-6 py-2 flex items-center rounded-full font-Outfit  hover:bg-gray-50 ">
    <Link href="/about">
       Cancel
      </Link>
    </div>
      </div>

     

   </form>

    </div>





      {/* <p>{data.username}</p> */}
     
    </>
      {/* <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormLabel>Display name</FormLabel>

        <Input
          type="text"
          placeholder="E.g Harry Udechukwu"
          {...register('username', {
            required: { value: true, message: 'please type a username' },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <FormLabel>About</FormLabel>
        <Input
          placeholder="E.g I am a Product Designer, i am currently based in Nigeria"
          {...register('bio', {
            required: { value: true, message: 'please input your bio' },
          })}
        />
        {errors.bio && <p>{errors.bio.message}</p>}

        <button type = 'submit'>Save</button>

      </form> */}
    </>
  )
}

export default EditProfile
