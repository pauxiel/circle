import React from 'react'

export default function CommButton(props) {
  return (
    <button
      onClick={() => props.toggler()} // just added
      className="max-w-xs rounded overflow-hidden shadow-lg my-4"
    >
      Create Communities
    </button>
  )
}
// the rest of the code should be the same
