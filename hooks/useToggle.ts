import { useState } from 'react'

export default function useToggle() {
  const [on, setOn] = useState(false)

  const toggler = () => {
    setOn((on) => !on)
  }

  return { on, toggler }
}
