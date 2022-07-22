import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  //   const { userCategory, username, Interest, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const isUserOnboarded = await prisma.user.findFirst({
    where: {
      email: session.user.email,

      onboarded: false,
    },
  })

  const UserOnboarded = await prisma.user.update({
    data: {
      onboarded: true,
    },
    where: {
      email: session.user.email,
    },
  })

  if (!isUserOnboarded) {
    return res.status(200).json(UserOnboarded)
  }

  // return res.status(200).json(UserOnboarded)
}
