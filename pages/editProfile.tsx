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
      <form onSubmit={handleSubmit(onSubmitForm)}>
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

      </form>
    </>
  )
}

export default EditProfile
