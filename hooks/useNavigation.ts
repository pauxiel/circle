import React, { useState } from 'react'

export default function useNavigation() {
  const [navIndex, setNavIndex] = useState(0)

  const navHandler = (direction) => {
    if (direction === 'next') {
      setNavIndex((currentIndex) => currentIndex + 1)
    }
    if (direction === 'previous') {
      setNavIndex((currentIndex) => currentIndex - 1)
    }
  }
  return { navIndex, navHandler }
}
