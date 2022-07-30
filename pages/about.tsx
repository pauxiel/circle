import { useSession, signOut, getSession } from 'next-auth/react'
import prisma from '../lib/prisma'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'
import Socials from '../asset/socials.svg'
import Malemoji from '../asset/malemoji.svg'
import ProfileCover from '../asset/coverprofile.svg'
import Globe from '../asset/globe.svg'
import Briefcase from '../asset/briefcase.svg'

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
      <div className="flex flex-col h-screen">
        <div className="cover-image relative -z-10 ">
          <Image
            src={ProfileCover}
            alt="the profile image preview"
            className=""
          />
        </div>

        <div className="flex items-center px-6 mb-6 ">
          <div className="flex items-center shadow-md w-28 p-1 rounded-full  -mt-14 bg-white">
            <div className="profile-avatar w-28 rounded-full flex items-center z-10 bg-yellow-500">
              <Image
                src={Malemoji}
                alt="the profile image preview"
                className=""
                width={130}
                height={130}
              />
            </div>
          </div>

          <div className="button border ml-auto px-6 py-2 flex items-center rounded-full font-Outfit hover:bg-blue-600 hover:text-white shadow-md">
            <Link href="/editProfile">Edit Profile</Link>
          </div>
        </div>

        <div className="user-details px-6 mb-4 ">
          <h1 className="font-bold text-2xl">{data.username}</h1>
          <span className="text-sm text-gray-400">{session?.user?.email}</span>
        </div>

        <div className="user-category px-6 mb-6 flex  items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image
              src={Briefcase}
              alt="the profile image preview"
              className=""
            />
            <span className="text-blue-500">{data.interest}</span>
          </div>

          {/* <div className="flex items-center space-x-2">
      <Image 
  src={Globe }
  alt='the profile image preview'
  className=""
      />
      <span className="text-blue-500"> harrythecooker.io</span>
      </div> */}
        </div>

        <h1 className="px-6 text-gray-500 text-xl mb-4">
          {' '}
          PROFILE INFORMATION{' '}
        </h1>

        <div className="user-details px-6 mb-4 ">
          <h1 className="font-bold text-2xl">About</h1>
          <p className="text-sm text-gray-400 leading-4">{data.bio}</p>
        </div>

        <div className="social mt-auto">
          <Image src={Socials} alt="the social icons" className="" />
        </div>
      </div>

      {/* <p>{data.username}</p> */}
    </>
  )
}

export default About
