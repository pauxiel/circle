import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  //   const { userCategory, username, interest, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const getCommProfile = await prisma.community.findUnique({
    where: {
      adminId: session.user.id,
    },

    select: {
      commName: true,
      commType: true,
      commAbout: true,
    },

    // include: {
    //   user: true,
    // },
  })

  console.log(getCommProfile)
  // console.log(session.user.email)
  return res.status(200).json(getCommProfile)
}
