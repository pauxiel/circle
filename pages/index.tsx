// import { NextPage } from 'next'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import prisma from '../lib/prisma'
import useRequireAuth from '../lib/useRequireAuth'

export async function getServerSideProps(context) {
  const session = await getSession(context)


  if(session) {

    const isUserOnboarded = await prisma.user.findFirst({
      where: {
        email: session.user.email,
  
        onboarded: false,
      },
    })


    if (isUserOnboarded) {
      return {
        redirect: {
          destination: '/onboarding',
          permanent: false,
        },
      }
    }

  }
 

  

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <h1>{`Welcome ${session?.user?.name}`}</h1>
      <p>{`Welcome ${session?.user?.email}`}</p>
      <button onClick={() => signOut()}>sign out</button>
    </>
  )
}

export default Home
