import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { userCategory, username, Interest, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const profile = await prisma.profile.create({
    data: {
      userCategory,
      username,
      Interest,
      bio,
      user: { connect: { email: session.user.email } },
    },
  })

  console.log(profile)
  return res.status(200).json(profile)
}
