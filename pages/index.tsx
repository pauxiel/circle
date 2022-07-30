// import { NextPage } from 'next'
import { useSession, signOut, getSession } from 'next-auth/react'
import { NextPage } from 'next'

import prisma from '../lib/prisma'
import useRequireAuth from '../lib/useRequireAuth'
import EmojiReact from 'react-emoji-react';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Profile from '../asset/jay.png'
import Setting from '../asset/setting.svg'
import Spotify from '../asset/spotify.svg'
import Link from '../asset/link.svg'
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
    count: 2
  },
  {
    name: 'blush',
    count: 1
  },
  {
    name: 100,
    count: 3
  },
  {
    name: 'grinning',
    count: 2
  }
];

class ReactingComponent extends Component {
  constructor() {
    super();
    this.state = {
      emojis
    };
  }

  onReaction(name) {
    const emojis = this.state.emojis.map(emoji => {
      if (emoji.name === name) {
        emoji.count += 1;
      }
      return emoji;
    });
    this.setState({ emojis });
  }

  onEmojiClick(name) {
    console.log(name);
    const emojis = this.state.emojis.concat([{name, count: 1}]);
    this.setState({ emojis });
  }

  render() {
    return (
      <EmojiReact 
        reactions={this.state.emojis} 
        onReaction={(name) => this.onReaction(name)} 
        onEmojiClick={(name) => this.onEmojiClick(name)}
      />
    );
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
 
        {/* Index Page styling Start*/}
      <div className="feed-section-loop  border-b">
      <div className="feed space-y-4 px-8 py-6 ">

      <div className=" community-tag flex items-center justify-between">

  <div className="bg-gray-50 border border-gray-200 flex items-center space-x-2 rounded-full px-2 py-1 font-Outfit">
 
    <Image 
    src={Spotify}
     alt='the community Post image'
  />

    <div className="community-name">
      <span>Spotify for Developers</span>
    </div>

  </div>
 
  <Image 
  src={Setting}
  alt='the pinned Post image'
  
  />

</div>


<div className="user flex items-center space-x-3">
    <div className="user-image">
    <Image 
  src={Profile}
  alt='the profile image preview'
  className="rounded-full"
  width={35} height={35}
  />
    </div>

    <div className="user-details ">
      <h1 className="font-bold">Harry Udechukwu</h1>
      <span className="text-gray-400"> 15 hours ago</span>
    </div>
  </div>

  <div className="post-caption">
    <p>Hey y’all, Here is the link to the documentations for the spotify document. Do well to check it out so you can get more light on how to use it correctly.</p>
  </div>

  <a className="link flex items-center  p-3 bg-gray-50 hover:bg-gray-100 border space-x-3 rounded-md" href="#">
  <Image 
 src={Link}
 alt='checkbox icon'
 className="rounded-full"
 width={45} height={45}

 />

    <div className="text-heading">
         <h1 className="text-md font-bold">You will be directed out of circcle when you click this link</h1>
       <p className="text-sm">External link</p>

  </div>
  </a>

  <ReactingComponent />

  {/* <ReactingComponent /> */}



      </div>
      </div>


      <div className="feed-section-loop  border-b">
      <div className="feed space-y-4 px-8 py-6 ">

      <div className=" community-tag flex items-center justify-between">

  <div className="bg-gray-50 border border-gray-200  flex items-center space-x-2 rounded-full px-2 py-1 font-Outfit">
 
    <Image 
    src={Spotify}
     alt='the community Post image'
  />

    <div className="community-name">
      <span>Spotify for Developers</span>
    </div>

  </div>
 
  <Image 
  src={Setting}
  alt='the pinned Post image'
  
  />

</div>


<div className="user flex items-center space-x-3">
    <div className="user-image">
    <Image 
  src={Profile}
  alt='the profile image preview'
  className="rounded-full"
  width={35} height={35}
  />
    </div>

    <div className="user-details ">
      <h1 className="font-bold">Harry Udechukwu</h1>
      <span className="text-gray-400"> 15 hours ago</span>
    </div>
  </div>

  <div className="post-caption">
    <p>Hey y’all, Here is the link to the documentations for the spotify document. Do well to check it out so you can get more light on how to use it correctly.</p>
  </div>

  <a className="link flex items-center  p-3 bg-gray-50 hover:bg-gray-100 border space-x-3 rounded-md" href="#">
  <Image 
 src={Link}
 alt='checkbox icon'
 className="rounded-full"
 width={45} height={45}

 />

    <div className="text-heading">
         <h1 className="text-md font-bold">You will be directed out of circcle when you click this link</h1>
       <p className="text-sm">External link</p>

  </div>
  </a>

  <ReactingComponent />

  {/* <ReactingComponent /> */}



      </div>
      </div>

      <div className="feed-section-loop  border-b">
      <div className="feed space-y-4 px-8 py-6 ">

      <div className=" community-tag flex items-center justify-between">

        <div className="bg-gray-50 border border-gray-200 flex items-center space-x-2 rounded-full px-2 py-1 font-Outfit">
 
    <Image 
    src={Spotify}
     alt='the community Post image'
  />

    <div className="community-name">
      <span>Spotify for Developers</span>
    </div>

        </div>
 
        <Image 
  src={Setting}
  alt='the pinned Post image'
  
  />

        </div>


      <div className="user flex items-center space-x-3">
    <div className="user-image">
    <Image 
  src={Profile}
  alt='the profile image preview'
  className="rounded-full"
  width={35} height={35}
  />
    </div>

    <div className="user-details ">
      <h1 className="font-bold">Harry Udechukwu</h1>
      <span className="text-gray-400"> 15 hours ago</span>
    </div>
       </div>
       <div className="post-caption">
    <p>Hey y’all, Here is the link to the documentations for the spotify document. Do well to check it out so you can get more light on how to use it correctly.</p>
      </div>

  <a className="link flex items-center  p-3 bg-gray-50 hover:bg-gray-100 border space-x-3 rounded-md" href="#">
  <Image 
 src={Link}
 alt='link icon'
 className="rounded-full"
 width={45} height={45}

 />

    <div className="text-heading">
         <h1 className="text-md font-bold">You will be directed out of circcle when you click this link</h1>
       <p className="text-sm">External link</p>

  </div>
  </a>

  <ReactingComponent />

  {/* <ReactingComponent /> */}



      </div>
      </div>
     
        {/* Index Page styling End*/}
    </>
  )
}

export default Home