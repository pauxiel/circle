import { PrismaClient } from '@prisma/client'

// import { PrismaClient } from '../generated/client'

let prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
