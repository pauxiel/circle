// import React from 'react'
import CreateCommOne from './CreateCommOne'
import CreateCommTwo from './CreateCommTwo'
import CreateCommThree from './CreateCommThree'
import { Transition } from '@headlessui/react'
import * as React from 'react'

import useNavigation from '../hooks/useNavigation'

export default function CreateCommModal() {
  const { navIndex, navHandler } = useNavigation()
  return (
    <div className="static">
      <div className="fixed h-screen w-screen bg-black z-10 top-0 opacity-50"></div>
      <div className="fixed top-0 right-0 left-0 z-20 flex justify-center">
        <div className="mt-24 mx-4 my-4 bg-white w-[420px] h-[420px] overflow-hidden relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute z-40 right-3 top-3 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          {/* modal content will be here  */}
          <Transition
            show={navIndex === 0}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <CreateCommOne />
          </Transition>
          <Transition
            show={navIndex === 1}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <CreateCommTwo />
          </Transition>
          {/* {navIndex === 1 && <CreateCommTwo />} */}
          <Transition
            show={navIndex === 2}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <CreateCommThree />
          </Transition>

          {/* modal content ends here  */}

          {navIndex <= 1 && (
            <div className="flex flex-col items-center py-4 absolute bottom-0 right-0 left-0 bg-white">
              <div className="mb-2">{navIndex + 1}/3</div>
              <button
                onClick={() => navHandler('next')}
                className="py-2 px-20 rounded-xl bg-slate-600 text-white"
              >
                {navIndex === 1 ? 'Done' : 'Next'}
              </button>
            </div>
          )}

          <div className="flex flex-col items-center py-4 absolute bottom-0 right-0 left-0 bg-white">
            <div className="mb-2">1/3</div>
            <button className="py-2 px-20 rounded-xl bg-slate-600 text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
