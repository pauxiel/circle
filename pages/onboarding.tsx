import { chakra, Button, Select,FormLabel,Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
// import Select from 'react-select'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import AciveCheck from '../asset/activemember.svg'
import CommunityCheck from '../asset/communitymanager.svg'
import OnboardingIcon from '../asset/onboarding.svg'
import Image from 'next/image'

const MAX_STEPS = 2

function Onboarding() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  })
  const [formStep, setFormStep] = useState(0)
  const [category, setCategory] = useState()

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1)
  }

  const renderButton = () => {
    if (formStep > 1) {
      return undefined
    } else if (formStep === 1) {
      return (
        <Button  colorScheme='messenger'  width='100%' disabled={!isValid} type="submit">
          Get Started
        </Button>
      )
    } else {
      return (
        <Button colorScheme='messenger'  width='100%' disabled={!isValid} type="button" onClick={completeFormStep}>
          Next Step
        </Button>
      )
    }
  }

  const router = useRouter()

  const onSubmitForm = async (values) => {
    const updateUser: AxiosRequestConfig = {
      url: '/api/updateUser',
      data: values,
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const config: AxiosRequestConfig = {
      url: '/api/onboard',
      data: values,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(config)
    if (res.status === 200) {
      const u = await axios(updateUser)
      // if (u.status === 200) {
      //   router.push('/index')
      //   console.log('loaded')
      // }
      if (u.status === 200) router.push('/', '/')
      console.log(res.data)
    } else {
      console.log('not loaded')
    }
  }

  const options = [
    { value: 'Active Member', label: 'Active Member' },
    { value: 'Community Manager', label: 'Community Manager' },
  ]
  return (
    <>

 {/* <chakra.form onSubmit={handleSubmit(onSubmitForm)}>
        {formStep < MAX_STEPS && (
          <div>
            <p>
              Step {formStep + 1} of {MAX_STEPS}
            </p>
          </div>
        )}

        {formStep >= 0 && (
          <section className={formStep === 0 ? 'block' : 'hidden'}>
       
            <Select
              placeholder="Select option"
              {...register('userCategory', {
                required: 'chose user Category',
              })}
            >
              <option value="Active Member">Active Member</option>
              <option value="Community Manager">Community Manager</option>
            </Select>

            {errors.userCategory && <p>{errors.userCategory.message}</p>}
          </section>
        )}

        {formStep >= 1 && (
          <section className={formStep === 1 ? 'block' : 'hidden'}>
            <FormLabel>username</FormLabel>

            <Input
              type="text"
              placeholder="E.g Harry Udechukwu"
              {...register('username', {
                required: { value: true, message: 'please type a username' },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <FormLabel>Which industry are you working in</FormLabel>
            <Input
              placeholder="E.g Product Designer"
              {...register('interest', {
                required: { value: true, message: 'please type your interest' },
              })}
            />
            {errors.interest && <p>{errors.interest.message}</p>}

            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="E.g I am a Product Designer, i am currently based in Nigeria"
              {...register('bio', {
                required: { value: true, message: 'please input your bio' },
              })}
            />
            {errors.bio && <p>{errors.bio.message}</p>}
          </section>
        )}

        {renderButton()}
      </chakra.form>  */}

      <form className="onboarding-steps font-Outfit w-full grid grid-col-3  space-y-6 items-center h-screen" onSubmit={handleSubmit(onSubmitForm)}>
       

        <div className="w-1/2 mx-auto">

        {formStep < MAX_STEPS && (
        <span className="text-md text-blue-600 font-bold"> 
        Step {formStep + 1} of {MAX_STEPS}</span>
         
        )}


        {formStep >= 0 && (
            <section className={formStep === 0 ? 'block' : 'hidden'}>

         
                <div className="space-y-6 first-step">
               <div className="text-heading">
                 <h1 className="text-3xl font-bold">How are you planning to use Circcle</h1>
               <p className="text-xl">it would help us set up your account proper for you</p>

                </div>
       
             <div className="check-boxes space-y-4"  
             {...register('userCategory', {
                required: 'Choose User Category',
              })}>
               <div className="first-check flex items-center space-x-3 p-4 rounded-md border border-gray-300">
               <Image 
            src={AciveCheck}
         alt='checkbox icon'
         className="rounded-full"
         width={25} height={25}
       
            />
           <div className="flex-1">
           <div className="flex items-center justify-between">
           <h1 className="font-bold">Active Member</h1>

             <input type="checkbox" name="" id="" value="Active Member"  {...register('userCategory', {
                required: 'Choose User Category',
              })}/>
           </div>
           <p>As an active member, you will join communities, connect with others and learn</p>
           </div>
        


              </div>

         <div className="second-check flex items-center space-x-3 p-4 rounded-md border border-gray-300">
         <Image 
         src={CommunityCheck}
         alt='checkbox icon'
         className="rounded-full"
         width={25} height={25}
       
         />
           <div className="flex-1">
           <div className="flex items-center justify-between">
           <h1 className="font-bold">Community manager</h1>

             <input type="checkbox" name="" id=""  value="Community Manager"  {...register('userCategory', {
                required: 'chose user Category',
              })} />
           </div>
           <p>As a community manager,you will set up and contol communities for a safer enviroment</p>
           </div>

               </div>

       </div>
          </div>
       
            {errors.userCategory && <p className="text-red-500 mt-2 italic">{errors.userCategory.message}</p>}
          </section>
        )}
        
        {formStep >= 1 && (
          <section className={formStep === 1 ? 'block' : 'hidden'}>
           <div className="text-heading mb-4">
                 <h1 className="text-3xl font-bold">Basic Information</h1>
               <p className="text-xl">To complete your profile, your basic information will be needed</p>

          </div>
      <div className="w-full flex flex-col font-Outfit space-y-2">
      <label htmlFor="Email" className="text-xl">Username:</label>
      <input name="username"  id="" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50" placeholder='Eg. harryudechukwu' 
       {...register('username', {
                required: { value: true, message: 'please type a username' },
              })}/>
       </div>
      {errors.username && <p className="text-red-500 my-2 italic">{errors.username.message}</p>}

      <div className="w-full flex flex-col font-Outfit space-y-2">
        <label htmlFor="Email" className="text-xl">Which industry are you working on?</label>
        <input  name=""  id="" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50" placeholder='Web Developer' 
      {...register('interest', {
        required: { value: true, message: 'please input your interest' },
      })}/>
       </div>
            {errors.interest && <p className="text-red-500 my-2 italic">{errors.interest.message}</p>}

        <div className="w-full flex flex-col font-Outfit space-y-2">
        <label htmlFor="bio" className="text-xl">Bio:</label>
        <textarea rows="4" cols="50" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50" placeholder='Eg. I’m a Web developer, currently based in Nigeria'  
        {...register('bio', {
                required: { value: true, message: 'please input your bio' },
              })}></textarea>
       </div>

            {errors.bio && <p className="text-red-500 my-2 italic">{errors.bio.message}</p>}
          </section>
        )}

        <div className="mt-4">
        {renderButton()}
        </div>
        
        </div>
     
      </form>
     
    </>
  )
}

export default Onboarding
