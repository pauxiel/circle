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
      email: { connect: { email: session.user.email } },

      onboarded: false,
    },
  })

  if (!isUserOnboarded) {
    // onboard User
    await prisma.user.update({
      data: {
        onboarded: true,
      },
      where: {
        email: { connect: { email: session.user.email } },
      },
    })
  }

  // const updateUser = await prisma.user.update({
  //   where: {
  //     onboarded: false,
  //   },
  //   data: {
  //     onboarded: true,
  //   },
  // })

  //   console.log(profile)
  // return res.status(200).json(updateUser)
}
