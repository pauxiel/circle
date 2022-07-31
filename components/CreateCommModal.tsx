// import React from 'react'
import CreateCommOne from './CreateCommOne'
import CreateCommTwo from './CreateCommTwo'

import { Transition } from '@headlessui/react'
import * as React from 'react'
import { useCreate } from '../context/contextCreate'

import useNavigation from '../hooks/useNavigation'

export default function CreateCommModal(props) {
  const { navIndex, navHandler } = useNavigation()

  const { state, setState } = useCreate()

  return (
    <div className="static">
      <div className="fixed h-screen w-screen bg-black z-10 top-0 opacity-50"></div>
      <div className="fixed top-0 right-0 left-0 z-20 flex justify-center">
        <div className="mt-24 mx-4 rounded-lg my-4 bg-white w-[500px] h-[550px] overflow-hidden relative">
          {/* <svg
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
          </svg> */}

          {navIndex <= 1 && <div className="px-4 pt-6 text-blue-600">{navIndex + 1}/2</div>}

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
          {/* <Transition
            show={navIndex === 2}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div>hi</div>
            <CreateCommThree /> 
             {renderComponent()}
          </Transition> */}

          {/* modal content ends here  */}
          {/* 
          {navIndex <= 1 && (
            <div className="flex flex-col items-center py-4 absolute bottom-0 right-0 left-0 bg-white">
              <div className="mb-2">{navIndex + 1}/3</div>
              <button
                onClick={() => navHandler('next')}
                className="py-2 px-20 rounded-xl bg-slate-600 text-white"
              >
                {navIndex === 1 ? 'Done' : 'Next'}
              </button>

              <button onClick={() => props.toggler()}>Cancel</button>
            </div>
          )} */}

          {navIndex === 0 && (
            <div className="px-6 space-x-4 flex items-center justify-left w-full">
              <button
                onClick={() => navHandler('next')}
                className="py-2 px-6 rounded-md bg-blue-500 text-white"
              >
                Continue
              </button>

              <button className="border py-2 px-6 rounded-md" onClick={() => props.toggler()}>Cancel</button>
            </div>
          )}

          {/* {navIndex === 1 && (
            <>
              <button
                className="py-2 px-20 rounded-xl bg-slate-600 text-white"
                type="submit"
              >
                Create
              </button>
            </>
          )} */}

          {/* {navIndex <= 2 && (
            <div className="flex flex-col items-center py-4 absolute bottom-0 right-0 left-0 bg-white">
              <div className="mb-2">{navIndex + 1}/3</div>
              <button
                onClick={() => navHandler('next')}
                className="py-2 px-20 rounded-xl bg-slate-600 text-white"
              >
                {navIndex === 2 ? 'Done' : 'Next'}
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
