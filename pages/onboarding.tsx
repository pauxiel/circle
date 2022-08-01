import {
  chakra,
  Button,
  Select,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
// import Select from 'react-select'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import AciveCheck from '../asset/activemember.svg'
import CommunityCheck from '../asset/communitymanager.svg'
import OnboardingIcon from '../asset/onboarding.svg'
import Image from 'next/image'
import { useSession, signOut, getSession } from 'next-auth/react'

const MAX_STEPS = 2

type Inputs = {
  username: string
  interest: string
  bio: string
  userCategory: string
}

function Onboarding() {
  const { data: session } = useSession()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'all',
  })
  const [formStep, setFormStep] = useState(0)
  const [category, setCategory] = useState()

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1)
  }

  const [state, setState] = useState('choosing')

  const renderButton = () => {
    if (formStep > 1 || state === 'onboarding') {
      return undefined
    } else if (formStep === 1 && state === 'choosing') {
      return (
        <Button
          colorScheme="messenger"
          width="100%"
          disabled={!isValid}
          type="submit"
        >
          Continue
        </Button>
      )
    } else if (formStep === 1 && state === 'success') {
      return (
        <Button
          colorScheme="messenger"
          width="100%"
          onClick={() => router.push('/', '/')}
          type="button"
        >
          Get Started
        </Button>
      )
    } else {
      return (
        <Button
          colorScheme="messenger"
          width="100%"
          disabled={!isValid}
          type="button"
          onClick={completeFormStep}
        >
          Next Step
        </Button>
      )
    }
  }

  const router = useRouter()

  const onSubmitForm = async (values) => {
    setState('onboarding')
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

      if (u.status === 200) {
        // router.push('/', '/')
        setState('success')
      }
      console.log(res.data)
    } else {
      setState('error')
      console.log('not loaded')
    }
  }

  const options = [
    { value: 'Active Member', label: 'Active Member' },
    { value: 'Community Manager', label: 'Community Manager' },
  ]

  const renderComponent = () => {
    switch (state) {
      case 'choosing':
        return (
          <section className={formStep === 1 ? 'block' : 'hidden'}>
            <div className="text-heading mb-4">
              <h1 className="text-3xl font-bold">Basic Information</h1>
              <p className="text-xl">
                To complete your profile, your basic information will be needed
              </p>
            </div>
            <div className="w-full flex flex-col font-Outfit space-y-2">
              <label htmlFor="Email" className="text-xl">
                Username:
              </label>
              <input
                name="username"
                id=""
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50"
                placeholder="Eg. harryudechukwu"
                {...register('username', {
                  required: {
                    value: true,
                    message: 'please type a username',
                  },
                })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 my-2 italic">
                {errors.username.message}
              </p>
            )}

            <div className="w-full flex flex-col font-Outfit space-y-2">
              <label htmlFor="Email" className="text-xl">
                Which industry are you working on?
              </label>
              <input
                name=""
                id=""
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50"
                placeholder="Web Developer"
                {...register('interest', {
                  required: {
                    value: true,
                    message: 'please input your interest',
                  },
                })}
              />
            </div>
            {errors.interest && (
              <p className="text-red-500 my-2 italic">
                {errors.interest.message}
              </p>
            )}

            <div className="w-full flex flex-col font-Outfit space-y-2">
              <label htmlFor="bio" className="text-xl">
                Bio:
              </label>
              <textarea
                rows={4}
                cols={50}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50"
                placeholder="Eg. I’m a Web developer, currently based in Nigeria"
                {...register('bio', {
                  required: { value: true, message: 'please input your bio' },
                })}
              ></textarea>
            </div>

            {errors.bio && (
              <p className="text-red-500 my-2 italic">{errors.bio.message}</p>
            )}
          </section>
        )
      case 'onboarding':
        return (
          <div className="text-heading space-y-4 flex items-center flex-col justify-center h-screen">
            <h1 className="text-3xl font-bold italic">Loading...</h1>
          </div>
        )

      case 'success':
        return (
          <div className="flex flex-col space-y-8 ">
            <Image
              src={OnboardingIcon}
              alt="onboarding icon preview"
              className=""
            />

            <div className="text-heading text-center space-y-3">
              <h1 className="text-3xl font-bold">
                Awesome, {session?.user?.name}
              </h1>
              <p className="text-xl">
                You just Completed your account setup, you can now start using
                circle
              </p>
            </div>
          </div>
        )

      case 'error':
        return <h1>error or username has been taken</h1>
    }
  }
  return (
    <>
      <form
        className="onboarding-steps font-Outfit w-full grid grid-col-3  space-y-6 items-center h-screen"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="w-1/2 mx-auto">
          {formStep < MAX_STEPS && (
            <span className="text-md text-blue-600 font-bold">
              {state === ('onboarding' || 'success') ? null : (
                <>
                  {' '}
                  Step {formStep + 1} of {MAX_STEPS}{' '}
                </>
              )}
              {/* Step {formStep + 1} of {MAX_STEPS} */}
            </span>
          )}

          {formStep >= 0 && (
            <section className={formStep === 0 ? 'block' : 'hidden'}>
              <div className="space-y-6 first-step">
                <div className="text-heading">
                  <h1 className="text-3xl font-bold">
                    How are you planning to use Circcle
                  </h1>
                  <p className="text-xl">
                    it would help us set up your account proper for you
                  </p>
                </div>

                <div
                  className="check-boxes space-y-4"
                  {...register('userCategory', {
                    required: 'Choose User Category',
                  })}
                >
                  <div className="first-check flex items-center space-x-3 p-4 rounded-md border border-gray-300">
                    <Image
                      src={AciveCheck}
                      alt="checkbox icon"
                      className="rounded-full"
                      width={25}
                      height={25}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h1 className="font-bold">Active Member</h1>

                        <input
                          type="checkbox"
                          name=""
                          id=""
                          value="Active Member"
                          {...register('userCategory', {
                            required: 'Choose User Category',
                          })}
                        />
                      </div>
                      <p>
                        As an active member, you will join communities, connect
                        with others and learn
                      </p>
                    </div>
                  </div>

                  <div className="second-check flex items-center space-x-3 p-4 rounded-md border border-gray-300">
                    <Image
                      src={CommunityCheck}
                      alt="checkbox icon"
                      className="rounded-full"
                      width={25}
                      height={25}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h1 className="font-bold">Community manager</h1>

                        <input
                          type="checkbox"
                          name=""
                          id=""
                          value="Community Manager"
                          {...register('userCategory', {
                            required: 'chose user Category',
                          })}
                        />
                      </div>
                      <p>
                        As a community manager,you will set up and contol
                        communities for a safer enviroment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.userCategory && (
                <p className="text-red-500 mt-2 italic">
                  {errors.userCategory.message}
                </p>
              )}
            </section>
          )}

          {formStep >= 1 && <>{renderComponent()}</>}

          <div className="mt-4">{renderButton()}</div>
        </div>
      </form>
    </>
  )
}

export default Onboarding
