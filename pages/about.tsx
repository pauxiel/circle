import { useSession, signOut, getSession } from 'next-auth/react'
import prisma from '../lib/prisma'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
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

function About() {
  const { data: session } = useSession()
  const { data, error } = useSWR('/api/getUserProfile', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <h1>{session?.user?.name}</h1>
      <p>{session?.user?.email}</p>

      <p>About</p>
      <p>{data.bio}</p>
      <p>{data.username}</p>
      <Link href="/editProfile">
        <a>Edit Profile</a>
      </Link>
    </>
  )
}

export default About
