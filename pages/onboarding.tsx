import { chakra, Input, FormLabel, Select, Button } from '@chakra-ui/react'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

function Onboarding() {
  const { register, handleSubmit } = useForm()
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
      if (u.status === 200) {
        router.push('/')
        console.log('loaded')
      }
    } else {
      console.log('not loaded')
    }
  }
  return (
    <>
      <chakra.form onSubmit={handleSubmit(onSubmitForm)}>
        <FormLabel>username</FormLabel>
        <Input
          type="username"
          placeholder="E.g Harry Udechukwu"
          {...register('username', { required: true })}
        />

        {/* <Select
          placeholder="Select option"
          {...register('userCategory', { required: true })}
        >
          <option value="Active Member">Active Member</option>
          <option value="Community Manager">Community Manager</option>
        </Select> */}

        <Input
          placeholder="category"
          {...register('userCategory', { required: true })}
        />

        <FormLabel>Which industry are you working in</FormLabel>
        <Input
          placeholder="E.g Product Designer"
          {...register('Interest', { required: true })}
        />

        <FormLabel>Bio</FormLabel>
        <Input
          placeholder="E.g I am a Product Designer, i am currently based in Nigeria"
          {...register('bio', { required: true })}
        />

        <Button type="submit">Submit</Button>
      </chakra.form>
    </>
  )
}

export default Onboarding
