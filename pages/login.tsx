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
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={0}
      _after={{
        bg: 'brand.500',
        opacity: 0.25,
        pos: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{
          base: 4,
          lg: 20,
        }}
        py={24}
      >
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          Pre Beta
        </Badge>
        <chakra.h1
          mb={6}
          fontSize={{
            base: '4xl',
            md: '4xl',
            lg: '3xl',
          }}
          fontWeight="bold"
          color="brand.600"
          _dark={{
            color: 'gray.300',
          }}
          lineHeight="shorter"
        >
          Communities where you can grow and connect within your circle
        </chakra.h1>
        <chakra.form onSubmit={handleSubmit} w="full" mb={6}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <chakra.p
            pr={{
              base: 0,
              lg: 16,
            }}
            mb={4}
            fontSize="sm"
            color="brand.600"
            _dark={{
              color: 'gray.400',
            }}
            letterSpacing="wider"
          >
            By creating an account you agree to our terms of service and privacy
            policy
          </chakra.p>
          <Button colorScheme="blue" type="submit" w="100%">
            Get Started
          </Button>
        </chakra.form>
        <VStack w="full">
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
      </Flex>
      <Box>
        <Image
          src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
          alt="3 women looking at a laptop"
          fit="cover"
          w="full"
          h={{
            base: 64,
            md: 'full',
          }}
          bg="gray.100"
          loading="lazy"
        />
      </Box>
    </SimpleGrid>
  )
}

export default Login
