import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function (req, res) {
  //   const { userCategory, username, interest, bio } = req.body

  const session = await getSession({ req })

  if (!session) {
    return res.status(401)
  }

  const fetchAllCom = await prisma.community.findMany()

  //   console.log(getCommProfile)
  // console.log(session.user.email)
  return res.status(200).json(fetchAllCom)
}
