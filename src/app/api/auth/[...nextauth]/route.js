import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!passwordsMatch) {
          throw new Error("Incorrect email or password")
        }
        
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, session}) {
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
        }
      }
      return token
    },
    async session({ session, token, user}) {

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address
        }
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
