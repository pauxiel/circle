import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import MailchimpProvider from 'next-auth/providers/mailchimp'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'user:email' } },

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          // username: profile.login,
          email: profile.email,

          image: profile.avatar_url,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          // username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),

    MailchimpProvider({
      clientId: process.env.MAILCHIMP_CLIENT_ID,
      clientSecret: process.env.MAILCHIMP_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        // id: token.uid,
        // email: user.email,
        // username: user.username,
      },
    }),
  },

  //get github email
}

export default NextAuth(authOptions)
