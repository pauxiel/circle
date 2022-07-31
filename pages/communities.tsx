import CreateCommModal from '../components/CreateCommModal'
import CommButton from '../components/CommButton'
import { useState } from 'react'
import useSWR from 'swr'
import { useForm, Controller } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import useToggle from '../hooks/useToggle'
import CreateProvider from '../context/contextCreate'
import FadeIn from 'react-fade-in'

function communities() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())


  const onSubmitForm = async (values) => {
    const addUser: AxiosRequestConfig = {
      url: '/api/addMember',
      data: values,
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios(addUser);
    if (res.status === 200) {
      console.log('yes')
    }





  }
  const { on, toggler } = useToggle()

  const { data: communities, error } = useSWR('/api/fetchAllCom', fetcher)

  const [communitiesNum, setCommunitiesNum] = useState<number>(10)

  const handleLoadMoreComm = () => {
    setCommunitiesNum((prevCommNum) => prevCommNum + 10)
  }

  if (error) return <div className="text-heading space-y-4 flex items-center flex-col justify-center h-screen">
  <h1 className="text-3xl font-bold italic">Failed to Load...</h1>
  </div>

  if (!communities) return <div className="text-heading space-y-4 flex items-center flex-col justify-center h-screen">
  <h1 className="text-3xl font-bold italic">Loading...</h1>
  </div>

  return (
    <>
      <CommButton toggler={toggler} />

      {/* <button type = 'button' toggler={toggler} >Submit</button> */}
      <CreateProvider>
        {on && <CreateCommModal toggler={toggler} />}
      </CreateProvider>

      <FadeIn>
        {communities?.slice(0, communitiesNum).map((community: any) => (
          <div key={community.id}>
            <h1>{community.commName}</h1>
            <p>{community.commType}</p>
            <p>{community.commAbout}</p>
            <form action="" onSubmit = {handleSubmit(onSubmitForm)}>
            {/* <input
              type="hidden"
              defaultValue={community.id}
              {...register('commId')}
            /> */}

               <input
              type="hidden"
              defaultValue={community.adminId}
              {...register('commAdmin')}
            />

            <button type = 'submit'>Join community</button>
            </form>
            
          </div>
        ))}
      </FadeIn>
    </>
  )
}

export default communities
