import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { username, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const editUserProfile = await prisma.profile.update({
    where: {
      userId: session.user.id,
    },

    data: {
      bio,
      username,
    },

    // include: {
    //   user: true,
    // },
  })

  console.log(editUserProfile)
  // console.log(session.user.email)
  return res.status(200).json(editUserProfile)
}
