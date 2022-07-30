import { useState } from 'react'

export default function useToggle() {
  const [on, setOn] = useState(true)

  const toggler = () => {
    setOn((on) => !on)
  }

  return { on, toggler }
}
