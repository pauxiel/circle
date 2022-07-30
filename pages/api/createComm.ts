import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { commName, commType, commAbout } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const community = await prisma.community.create({
    data: {
      commName,
      commType,
      commAbout,
      communityAdmin: {
        create: {
          id: session.user.id,
          admin: {
            connect: { email: session.user.email },
            // create: { id: session.user.id },
            
          },
        },
      },
    },
  })

  //   console.log(profile)
  // console.log(session.user.email)
  return res.status(200).json(community)
}
