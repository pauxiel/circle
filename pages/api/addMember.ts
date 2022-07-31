import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const { commAdmin } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  // const community = await prisma.community.create({
  //   data: {
  //     members: {
  //       create: [
  //         {
  //           name: session.user.name,
  //           email: session.user.email,
  //         },
  //       ],
  //     },
  //     // id: { connect: { id: commId } },
  //     communityAdmin: { connect: { userId: commAdmin } },
  //   },
  // })

  const community = await prisma.community.update({
    where: {
      adminId: commAdmin,
    },

    data: {
      members: {
        set: [{ id: session.user.id }],
      },
    },
  })

  //   console.log(profile)
  // console.log(session.user.email)
  return res.status(200).json(community)
}
