import { PropsWithChildren } from 'react'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import prisma from '../../lib/prisma'
// import useRequireAuth from './lib/useRequireAuth'
import { VStack, Container } from '@chakra-ui/react'
import Header from './header'
import LeftSidebar from './LeftSideBar'
import Aside from './Aside'

type Props = PropsWithChildren<{}>

function Layout({ children }: Props) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex sm:flex-row">
          <main className="flex-1 h-screen overflow-y-auto font-Outfit border-r">
            {children}
          </main>
          <LeftSidebar />
          <Aside />
        </div>
      </div>
    </>
  )
}

export default Layout
