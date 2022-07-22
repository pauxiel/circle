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

  return res.status(200).json(isUserOnboarded)
}
