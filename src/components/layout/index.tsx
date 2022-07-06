import { PropsWithChildren } from 'react'
import { VStack, Container } from '@chakra-ui/react'

type Props = PropsWithChildren<{}>

function Layout({ children }: Props) {
  return (
    <Container>
      <VStack>
        {/* header */}
        {children}
        {/* footer */}
      </VStack>
    </Container>
  )
}

export default Layout
