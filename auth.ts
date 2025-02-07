import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './lib/prisma';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const existingUser = profile?.email
          ? await db.user.findUnique({ where: { email: profile.email } })
          : null;

        if (existingUser) {
          return true;
        }

        await db.user.create({
          data: {
            email: profile?.email as string,
            name: profile?.name as string,
            subscription: {
              create: {},
            },
          },
        }); // Create a new user with these details
        return true;
      }

      // TODO: handle other providers
      return false;
    },
    async session({ session, token }) {
      const dbUser = token.email
        ? await db.user.findUnique({
            where: { email: token.email },
          })
        : null;

      // eslint-disable-next-line no-param-reassign
      session.userId = dbUser?.id as string;
      return session;
    },
  },
  // TODO: this wasnt in docs but seems to be required
  secret: process.env.NEXT_AUTH_SECRET,
});
