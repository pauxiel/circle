import { PropsWithChildren } from 'react'
import { VStack, Container } from '@chakra-ui/react'

type Props = PropsWithChildren<{}>

function Layout({ children }: Props) {
  return (
    <>
      {/* header */}
      {children}
      {/* footer */}
    </>
  )
}

export default Layout
