import { getSession, signIn } from 'next-auth/react'
import { Box, VStack, Button, chakra, FormLabel, Input } from '@chakra-ui/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { useState } from 'react'

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
  { name: 'google', Icon: BsGoogle },
]

function Login() {
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return false

    signIn('email', { email, redirect: false })
  }
  return (
    <>
      <Box>
        <chakra.form onSubmit={handleSubmit}>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit">Get Started</Button>
        </chakra.form>
        <VStack>
          {providers.map(({ name, Icon }) => (
            <Button key={name} leftIcon={<Icon />} onClick={() => signIn(name)}>
              Sign in with {name}
            </Button>
          ))}
        </VStack>
      </Box>
      <button type="button" onClick={() => signIn('github')} className="">
        Github
      </button>
    </>
  )
}

export default Login
