// import { NextPage } from 'next'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'

export async function getServerSideProps(context) {
  const session = await getSession(context)

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
      <button onClick={() => signOut()}>sign out</button>
    </>
  )
}

export default Home
