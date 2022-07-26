import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { name, industryType, about } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const community = await prisma.community.create({
    data: {
      name,
      industryType,
      // email: session.user.email,
      about,
      // user: { connect: { email: session.user.email } },
    },
  })

//   console.log(profile)
  // console.log(session.user.email)
  return res.status(200).json(community)
}
