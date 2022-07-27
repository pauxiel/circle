import { getSession, signIn } from 'next-auth/react'
import useRequireAuth from '../lib/useRequireAuth'
import {
  Box,
  VStack,
  Button,
  chakra,
  FormLabel,
  Input,
  Flex,
  Image,
  Stack,
  SimpleGrid,
  Badge,
  VisuallyHidden,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import Logo from '../asset/logo.svg'
import SignBg from '../asset/signupbg.svg'
import Flower from '../asset/flower.svg'
import Pattern from '../asset/pattern.svg'



export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

const providers = [
  { name: 'github', Icon: BsGithub },
  { name: 'google', Icon: FcGoogle },
]

function Login() {
  const [email, setEmail] = useState<string>('')

  // const session = useRequireAuth()

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: '/onboarding',
  //       permanent: false,
  //     },
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return false

    signIn('email', { email, redirect: false })
  }
  return (
   
    <>
    {/* Login Page Styling Start */}
   <section className="grid grid-cols-2 z-10">
    <div className="left-side h-screen">
    <header className="py-4 px-6">
        <div className="logo w-full">
          <Image 
          src={Logo.src}
          alt='the circle app Logo'
          className="w-24"
          
          />
        </div>
      </header>

      <div className="flex py-20 px-8 ">
        <div className="flex items-start relative">
        <Image 
          src={Flower.src}
          alt='the circle app Logo'
          className="absolute -top-4 -left-2"
          
          />
          <div className="heading font-Outfit px-6">
          <h1 className="text-2xl font-bold">Communities where you can grow and connect within your circle</h1>
         <p className="text-xl">Join the talent-driven communites and members and find opportunites </p>
          </div>
        </div>
     
        

        <Image 
          src={Pattern.src}
          alt='the circle app Logo'
          className=""
          
          />
      </div>

      <form className=" px-16 w-full space-y-8 pb-2" onSubmit={handleSubmit}>
      <div className="email w-full flex flex-col font-Outfit space-y-2">
      <label htmlFor="Email" className="text-xl">Email</label>
      <input type="email" name=""  id="" className="border p-2 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50" placeholder='Enter your email'
       onChange={(e) => setEmail(e.target.value)}/>

      <span>By creating an account you agree to our terms of service and privacy policy </span>
      </div>

      <button className="bg-blue-600 rounded-md w-full py-3 px-2 text-white" type="submit">
            Get Started
      </button>
      
      </form>

         <VStack className="px-16 w-full ">
          {providers.map(({ name, Icon }) => (
            <Button
              key={name}
              leftIcon={<Icon />}
              w="100%"
              onClick={() => signIn(name)}
            >
              Sign in with {name}
            </Button>
          ))}
        </VStack>

    </div>

    <div className="right-side h-screen bg-gray-100 flex justify-end">

         <Image 
          src={SignBg.src}
          alt='the whatnew icon'
        
          
         
    />
   
    </div>
   </section>

    {/* Login Page Styling End */}

    </>
    
  )
}

export default Login
