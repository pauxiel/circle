import { chakra, Input, FormLabel, Button, Box, Select } from '@chakra-ui/react'
import { useState } from 'react'
// import Select from 'react-select'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

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
        <Button disabled={!isValid} type="submit">
          Submit
        </Button>
      )
    } else {
      return (
        <Button disabled={!isValid} type="button" onClick={completeFormStep}>
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
      <chakra.form onSubmit={handleSubmit(onSubmitForm)}>
        {formStep < MAX_STEPS && (
          <div>
            <p>
              Step {formStep + 1} of {MAX_STEPS}
            </p>
          </div>
        )}

        {formStep >= 0 && (
          <section className={formStep === 0 ? 'block' : 'hidden'}>
            {/* <Controller
              name="userCategory"
              {...register('userCategory', {
                required: { value: true, message: 'please type a username' },
              })}
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue={''} options={options} />
              )}
            /> */}
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
      </chakra.form>
    </>
  )
}

export default Onboarding
