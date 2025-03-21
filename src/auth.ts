import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    newUser: "/user/profil",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        throw new Error("Email tidak ditemukan pada akun Google.");
      }

      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email,
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.id = dbUser.id; // Simpan ID user ke dalam JWT
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Tambahkan ID ke session
      }
      return session;
    },
  },
});
