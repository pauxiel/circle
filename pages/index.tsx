// import { NextPage } from 'next'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import prisma from '../lib/prisma'
import useRequireAuth from '../lib/useRequireAuth'
import EmojiReact from 'react-emoji-react'
import React, { Component } from 'react'
import { render } from 'react-dom'
import Logo from '../asset/logo.svg'
import Search from '../asset/search.svg'
import Feed from '../asset/feed.svg'
import Community from '../asset/communities.svg'
import Message from '../asset/message.svg'
import Notification from '../asset/notifications.svg'
import Whatnew from '../asset/whatnew.svg'
import Soon from '../asset/soon.svg'
import Profile from '../asset/jay.png'
import Logout from '../asset/logout.svg'
import Pinned from '../asset/pinned.svg'
import Setting from '../asset/setting.svg'
import Spotify from '../asset/spotify.svg'
import Image from 'next/image'

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

const emojis = [
  {
    name: 'rage',
    count: 2,
  },
  {
    name: 'blush',
    count: 1,
  },
  {
    name: 100,
    count: 3,
  },
  {
    name: 'grinning',
    count: 2,
  },
]

class ReactingComponent extends Component {
  constructor() {
    super()
    this.state = {
      emojis,
    }
  }

  onReaction(name) {
    const emojis = this.state.emojis.map((emoji) => {
      if (emoji.name === name) {
        emoji.count += 1
      }
      return emoji
    })
    this.setState({ emojis })
  }

  onEmojiClick(name) {
    console.log(name)
    const emojis = this.state.emojis.concat([{ name, count: 1 }])
    this.setState({ emojis })
  }

  render() {
    return (
      <EmojiReact
        reactions={this.state.emojis}
        onReaction={(name) => this.onReaction(name)}
        onEmojiClick={(name) => this.onEmojiClick(name)}
      />
    )
  }
}

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      {/*     
      <h1>{`Welcome ${session?.user?.name}`}</h1>
      <p>{`Welcome ${session?.user?.email}`}</p>
      <button onClick={() => signOut()}>sign out</button> */}
      <div className="min-h-screen flex flex-col">
        <header className="border border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="logo w-full">
            <Image src={Logo} alt="the circle app Logo" className="w-full" />
          </div>

          <div className="search w-1/3 p-2 flex items-center space-x-2 rounded-full  border border-gray-200 ">
            <Image src={Search} alt="the circle app Logo" className="w-full" />
            <input
              type="text"
              name=""
              id=""
              className="w-full focus:ring-0 pr-3 font-Outfit outline-none"
              placeholder="Search communities, interest & username"
            />
          </div>
        </header>

        <div className="flex-1 flex sm:flex-row">
          {/* Main styling */}
          <main className="flex-1 h-screen overflow-y-auto px-8 py-6 font-Outfit border-r">
            <div className="feed-section space-y-4">
              <div className=" community-tag flex items-center justify-between">
                <div className="bg-gray-50 border border-gray-200 flex items-center space-x-2 rounded-full px-2 py-1 font-Outfit">
                  <Image src={Spotify} alt="the community Post image" />

                  <div className="community-name">
                    <span>Spotify for Developers</span>
                  </div>
                </div>

                <Image src={Setting} alt="the pinned Post image" />
              </div>

              <div className="user flex items-center space-x-3">
                <div className="user-image">
                  <Image
                    src={Profile}
                    alt="the profile image preview"
                    className="rounded-full"
                    width={35}
                    height={35}
                  />
                </div>

                <div className="user-details ">
                  <h1 className="font-bold">Harry Udechukwu</h1>
                  <span className="text-gray-400"> 15 hours ago</span>
                </div>
              </div>

              <div className="post-caption">
                <p>
                  Hey y’all, Here is the link to the documentations for the
                  spotify document. Do well to check it out so you can get more
                  light on how to use it correctly.
                </p>
              </div>

              <ReactingComponent />
            </div>
          </main>

          {/* left-sidebar styling */}
          <nav className="order-first bg-gray-100 w-1/4 px-8 py-12 font-Outfit text-dark font-medium flex flex-col">
            <h1 className="text-gray-500 px-2">OVERVIEW</h1>
            <div className="nav-items space-y-3">
              <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image src={Feed} alt="the feed icon" className="w-full" />
                <span>My Feed</span>
              </div>

              <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image
                  src={Community}
                  alt="the community icon"
                  className="w-full"
                />
                <span>Communities</span>
              </div>

              <div className="nav-item flex items-center space-x-3  hover:bg-gray-200 px-2 py-3 rounded-md">
                <div className="flex items-center space-x-3">
                  <Image src={Message} alt="the message icon" className="" />

                  <span>Messages</span>
                </div>

                <div className="coming-soon">
                  <Image src={Soon} alt="the coming soon icon" className="" />
                </div>
              </div>

              <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image
                  src={Notification}
                  alt="the notification icon"
                  className="w-full"
                />
                <span>Notifications</span>
              </div>

              <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image
                  src={Whatnew}
                  alt="the whatnew icon"
                  className="w-full"
                />
                <span>What's New</span>
              </div>
            </div>

            <div className="border-b border-gray-300 mt-6"></div>

            <div className="setting mt-auto">
              <div className="profile flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image
                  src={Profile}
                  alt="the profile image preview"
                  className="rounded-full"
                  width={30}
                  height={30}
                />

                <span>Profile</span>
              </div>

              <div className="log-out flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
                <Image src={Logout} alt="the whatnew icon" className="w-full" />
                {/* <span>Log out</span> */}
                <button onClick={() => signOut()}>Log Out</button>
              </div>
            </div>
          </nav>

          {/* right-sidebar styling */}
          <aside className="w-1/4 px-8 py-12 font-Outfit flex flex-col justify-center space-y-4 ">
            <div className="pinned">
              <Image src={Pinned} alt="the pinned Post image" />
            </div>

            <div className="coming-soon text-center">
              <Image
                src={Soon}
                alt="the coming soon icon"
                className=""
                width={130}
                height={50}
              />
            </div>

            <div className="paragraph text-center">
              <h1 className="font-bold text-2xl">Pinned Posts</h1>
              <p>
                Want to get quick access to important posts? You can pin
                important posts to your screen for easy access
              </p>
            </div>
          </aside>
        </div>

        {/* <footer className="bg-gray-100">Footer</footer> */}
      </div>
    </>
  )
}

export default Home
