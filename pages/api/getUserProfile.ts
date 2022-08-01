import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  //   const { userCategory, username, interest, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const getUserProfile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },

    select: {
      bio: true,
      username: true,
      interest: true,
    },

    // include: {
    //   user: true,
    // },
  })

  console.log(getUserProfile)
  // console.log(session.user.email)
  return res.status(200).json(getUserProfile)
}
