import CreateCommModal from '../components/CreateCommModal'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import useToggle from '../hooks/useToggle'
import CreateProvider from '../context/contextCreate'

function communities() {
  const { on, toggler } = useToggle()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  })
  const [formStep, setFormStep] = useState(0)
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1)
  }

  const router = useRouter()

  const onSubmitForm = async (values) => {
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
      router.push('/', '/')
    }
  }
  return (
    <>
      <div className="">
        <nav className="flex justify-between bg-slate-700 text-white py-4 px-10">
          <span>Logo</span>
          <span>☀</span>
        </nav>
      </div>

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

      {/* <button type = 'button' toggler={toggler} >Submit</button> */}
      <CreateProvider>
        {on && <CreateCommModal toggler={toggler} />}
      </CreateProvider>
    </>
  )
}

export default communities
