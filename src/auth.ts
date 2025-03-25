import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      username: {},
      password: {},
    },
    authorize: async (credentials) => {
      if (!credentials?.username || !credentials?.password) {
        throw new Error("Username dan password harus diisi.");
      }
    
      // Cari user berdasarkan username
      const user = await prisma.admin.findUnique({
        where: { username: credentials.username as string }
      });
    
      if (!user) {
        throw new Error("User tidak ditemukan.");
      }
    
      // Cek password langsung (tidak aman, hanya untuk testing!)
      if (user.password !== credentials.password) {
        throw new Error("Password salah.");
      }
    
      console.log("Login sukses:", user);
    
      // ✅ Kembalikan objek yang sesuai dengan NextAuth
      return {
        id: user.id.toString(), // NextAuth mengharapkan ID dalam bentuk string
        name: user.username, // Gunakan username sebagai nama
        email: user.email || "", // Pastikan ada email meskipun kosong
      };
    },
  }),],
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
