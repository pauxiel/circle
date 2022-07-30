import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { commName, commAbout } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const editComProfile = await prisma.community.update({
    where: {
      adminId: session.user.id,
    },

    data: {
      commName,
      commAbout,
    },

    // include: {
    //   user: true,
    // },
  })

  //   console.log(editUserProfile)
  // console.log(session.user.email)
  return res.status(200).json(editComProfile)
}
