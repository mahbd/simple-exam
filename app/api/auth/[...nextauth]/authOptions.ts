import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
        // @ts-ignore
        token.role = dbUser?.role || "USER";
      }
      return token;
    },
    async session({ session }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: session.user.email!,
          },
        });
        // @ts-ignore
        session.user.role = dbUser?.role || "USER";
      }
      return session;
    },
  },
};

export default authOptions;
