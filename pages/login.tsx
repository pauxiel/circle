import { getSession, signIn } from 'next-auth/react'


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

function Login() {
  return (
    <>
      <button type="button" onClick={() => signIn('github')} className="">
        Github
      </button>
    </>
  )
}

export default Login
