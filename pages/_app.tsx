import '../styles/globals.css'
import { useState, useCallback, useEffect } from 'react'
// import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import theme from '../theme'
import Layout from '../components/layout/index'

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState<boolean>(false)

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addListener(updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeListener(updateTarget)
  }, [])

  return targetReached
}

function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const isBreakpoint = useMediaQuery(768)

  const getContent = () => {
    if (
      [`/login`].includes(appProps.router.pathname) ||
      [`/onboarding`].includes(appProps.router.pathname)
    )
      return <Component {...pageProps} />

    return (
      <Layout>
        <Component {...pageProps} />{' '}
      </Layout>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        {isBreakpoint ? (
          <h1>
            Hang on we are building something great, open on your desktop to
            view
          </h1>
        ) : (
          <>{getContent()}</>
        )}
      </SessionProvider>
    </ChakraProvider>
  )
}

export default App
